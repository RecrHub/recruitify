package com.recruitify.webapi.common.auth.service;

import com.recruitify.webapi.common.auth.dto.LoginRequest;
import com.recruitify.webapi.common.auth.dto.LoginResponse;
import com.recruitify.webapi.common.exception.AccountDeactivatedException;
import com.recruitify.webapi.common.model.identity.RefreshToken;
import com.recruitify.webapi.common.model.identity.User;
import com.recruitify.webapi.common.repository.UserRepository;
import com.recruitify.webapi.common.security.UserDetailsImpl;
import com.recruitify.webapi.common.token.service.IRefreshTokenService;
import com.recruitify.webapi.common.token.service.ITokenService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

/**
 * Template-method base for every role-specific login flow.
 *
 * <p>Carries the cross-role plumbing that was previously triplicated across
 * User / HR / Admin login services:
 * <ol>
 *   <li>Look up the user by email.</li>
 *   <li>Delegate the role check to {@link #isRoleAllowed(String)}.</li>
 *   <li>Verify the account is active and not locked.</li>
 *   <li>Verify the password against the stored hash.</li>
 *   <li>Populate {@link SecurityContextHolder} for downstream token generation.</li>
 *   <li>Issue an access token via {@link ITokenService} and a refresh token
 *       via {@link IRefreshTokenService} (with a recovery path on
 *       {@link DataIntegrityViolationException}).</li>
 *   <li>Assemble a {@link LoginResponse}.</li>
 * </ol>
 *
 * <p>Subclasses only define {@link #isRoleAllowed(String)} (and optionally a
 * human label via {@link #roleLabel()} for logging).
 *
 * <p>Also implements {@link UserDetailsService} with a default
 * {@code loadUserByUsername} so HR/User flows that wire into Spring Security
 * get the implementation for free. Subclasses that don't need it simply
 * ignore the inherited method.
 */
@Slf4j
@RequiredArgsConstructor
public abstract class AbstractRoleBasedLoginService implements ILoginService, UserDetailsService {

    protected final UserRepository userRepository;
    protected final PasswordEncoder passwordEncoder;
    protected final ITokenService tokenService;
    protected final IRefreshTokenService refreshTokenService;

    /**
     * Subclass hook: returns {@code true} when an account with the given
     * database role name (e.g. {@code "ROLE_ADMIN"}) is permitted to log in
     * via this endpoint. Returning {@code false} raises
     * {@link BadCredentialsException} so callers cannot probe whether an
     * account exists.
     */
    protected abstract boolean isRoleAllowed(String role);

    /**
     * Subclass hook: short label used in log messages (e.g. "Admin", "HR", "User").
     * Defaults to "User" — override for clearer audit trails.
     */
    protected String roleLabel() {
        return "User";
    }

    @Override
    @Transactional
    public LoginResponse login(LoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String label = roleLabel();

        // 1. Look up the user
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(
                        "User not found with email: " + email));

        // 2. Role gate — throws BadCredentialsException (same as wrong password)
        //    so we don't leak that the account exists.
        String role = user.getRole().getName();
        if (!isRoleAllowed(role)) {
            log.warn("Account '{}' attempted {} login but role={} is not allowed",
                    email, label, role);
            throw new BadCredentialsException("Invalid credentials");
        }

        // 3. Active / locked checks
        ensureAccountIsAccessible(user, email, label);

        // 4. Password check
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPasswordHash())) {
            log.error("{} password mismatch for email: {}", label, email);
            throw new BadCredentialsException("Bad credentials");
        }

        // 5. Populate SecurityContext (used by token generation)
        UserDetailsImpl userDetails = UserDetailsImpl.build(user);
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // 6. Issue tokens via the common token service
        String accessToken = tokenService.generateAccessToken(userDetails);
        RefreshToken refreshToken = issueRefreshToken(user, label);

        log.info("{} login successful for email={} role={}", label, email, role);

        // 7. Build response
        return LoginResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken.getToken())
                .id(userDetails.getId())
                .email(userDetails.getEmail())
                .role(role)
                .build();
    }

    /**
     * Default {@link UserDetailsService#loadUserByUsername(String)} used by
     * HR / User flows. Throws if the account is inactive or currently locked,
     * mirroring the original duplicated implementations.
     */
    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        if (!user.getIsActive()) {
            log.warn("Failed login attempt for inactive account: {}", email);
            throw new AccountDeactivatedException("Account is deactivated");
        }

        if (user.getLockedUntil() != null && user.getLockedUntil().isAfter(Instant.now())) {
            log.warn("Failed login attempt for locked account: {}", email);
            throw new RuntimeException("Account is temporarily locked until " + user.getLockedUntil());
        }

        return UserDetailsImpl.build(user);
    }

    // ---- helpers --------------------------------------------------------

    private void ensureAccountIsAccessible(User user, String email, String label) {
        if (!user.getIsActive()) {
            log.warn("Failed {} login attempt for inactive account: {}", label, email);
            throw new AccountDeactivatedException("Account is deactivated");
        }
        if (user.getLockedUntil() != null && user.getLockedUntil().isAfter(Instant.now())) {
            log.warn("Failed {} login attempt for locked account: {}", label, email);
            throw new RuntimeException("Account is temporarily locked until " + user.getLockedUntil());
        }
    }

    /**
     * Creates a refresh token for the user, with a recovery path that reuses
     * an existing active token when a {@link DataIntegrityViolationException}
     * surfaces (e.g. unique constraint hit by a concurrent login).
     */
    private RefreshToken issueRefreshToken(User user, String label) {
        try {
            return refreshTokenService.createRefreshToken(user);
        } catch (DataIntegrityViolationException ex) {
            log.warn("Constraint violation creating {} refresh token, reusing an existing active one", label);
            List<RefreshToken> activeTokens = refreshTokenService.findActiveTokensByUser(user);
            if (activeTokens.isEmpty()) {
                throw new RuntimeException("Could not create or find valid refresh token");
            }
            return activeTokens.get(0);
        }
    }
}
