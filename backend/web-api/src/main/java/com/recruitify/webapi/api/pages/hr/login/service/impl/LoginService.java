package com.recruitify.webapi.api.pages.hr.login.service.impl;

import com.recruitify.webapi.api.pages.hr.login.dto.request.LoginRequest;
import com.recruitify.webapi.api.pages.hr.login.dto.response.LoginResponseVO;
import com.recruitify.webapi.api.pages.hr.login.service.ILoginService;
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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Set;

/**
 * HR login implementation.
 *
 * Reuses the common authentication + token infrastructure
 * ({@link UserRepository}, {@link ITokenService}, {@link IRefreshTokenService})
 * but enforces the HR-specific rule: the account MUST have an HR/EMPLOYER role.
 *
 * If a non-HR account (e.g. a CANDIDATE) tries to log in via /api/v1/hr/auth/login,
 * a {@link BadCredentialsException} is thrown — never revealing that the account exists.
 */
@Slf4j
@Service("hrLoginService")
@RequiredArgsConstructor
public class LoginService implements ILoginService, UserDetailsService {

    /** Roles allowed to authenticate through the HR login endpoint. */
    private static final Set<String> HR_ROLES = Set.of("ROLE_HR", "ROLE_EMPLOYER", "ROLE_RECRUITER");

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ITokenService tokenService;
    private final IRefreshTokenService refreshTokenService;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + email));

        if (!user.getIsActive()) {
            log.warn("Failed HR login attempt for inactive account: {}", email);
            throw new RuntimeException("Account is deactivated");
        }

        if (user.getLockedUntil() != null && user.getLockedUntil().isAfter(Instant.now())) {
            log.warn("Failed HR login attempt for locked account: {}", email);
            throw new RuntimeException("Account is temporarily locked until " + user.getLockedUntil());
        }

        return UserDetailsImpl.build(user);
    }

    @Override
    @Transactional
    public LoginResponseVO login(LoginRequest loginRequest) {
        String email = loginRequest.getEmail();

        // 1. Look up the user
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(
                        "User not found with email: " + email));

        // 2. ★ HR-specific rule: only HR/EMPLOYER/RECRUITER accounts may log in here.
        //    We throw BadCredentialsException (not a "wrong role" message) so we don't
        //    leak the existence or role of the account to an attacker.
        String role = user.getRole().getName();
        if (!HR_ROLES.contains(role.toUpperCase())) {
            log.warn("Non-HR account '{}' attempted HR login (actual role={})", email, role);
            throw new BadCredentialsException("Invalid credentials");
        }

        // 3. Active / locked checks (mirrored from UserLoginService)
        if (!user.getIsActive()) {
            throw new AccountDeactivatedException("Account is deactivated");
        }

        if (user.getLockedUntil() != null && user.getLockedUntil().isAfter(Instant.now())) {
            throw new RuntimeException("Account is temporarily locked until " + user.getLockedUntil());
        }

        // 4. Password check
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPasswordHash())) {
            log.error("HR password mismatch for email: {}", email);
            throw new BadCredentialsException("Bad credentials");
        }

        // 5. Populate SecurityContext (used by token generation)
        UserDetailsImpl userDetails = UserDetailsImpl.build(user);
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // 6. Issue tokens via the common token service
        String accessToken = tokenService.generateAccessToken(userDetails);

        RefreshToken refreshToken;
        try {
            refreshToken = refreshTokenService.createRefreshToken(user);
        } catch (DataIntegrityViolationException ex) {
            log.warn("Constraint violation creating HR refresh token, reusing an existing active one");
            List<RefreshToken> activeTokens = refreshTokenService.findActiveTokensByUser(user);
            if (activeTokens.isEmpty()) {
                throw new RuntimeException("Could not create or find valid refresh token");
            }
            refreshToken = activeTokens.get(0);
        }

        log.info("HR login successful for email={} role={}", email, role);

        // 7. Build response
        return LoginResponseVO.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken.getToken())
                .id(userDetails.getId())
                .email(userDetails.getEmail())
                .role(role)
                .build();
    }
}
