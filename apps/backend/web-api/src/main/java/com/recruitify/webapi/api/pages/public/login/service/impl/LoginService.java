package com.recruitify.webapi.api.pages.login.service.impl;

import com.recruitify.webapi.common.model.identity.RefreshToken;
import com.recruitify.webapi.common.model.identity.User;
import com.recruitify.webapi.common.security.UserDetailsImpl;
import com.recruitify.webapi.common.token.service.IRefreshTokenService;
import com.recruitify.webapi.common.token.service.ITokenService;
import com.recruitify.webapi.api.pages.login.dto.request.LoginRequest;
import com.recruitify.webapi.common.repository.UserRepository;
import com.recruitify.webapi.api.pages.login.service.ILoginService;
import com.recruitify.webapi.api.pages.login.vo.LoginResponseVO;
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

@Slf4j
@Service
@RequiredArgsConstructor
public class LoginService implements UserDetailsService, ILoginService {
    private final UserRepository userRepository;
    private final IRefreshTokenService refreshTokenService;
    private final ITokenService tokenService;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + email));

        // Check if account is active
        if (!user.getIsActive()) {
            log.warn("Failed login attempt for inactive account: {}", email);
            throw new RuntimeException("Account is deactivated");
        }

        // Check if account is locked
        if (user.getLockedUntil() != null && user.getLockedUntil().isAfter(Instant.now())) {
            log.warn("Failed login attempt for locked account: {}", email);
            throw new RuntimeException("Account is temporarily locked until " + user.getLockedUntil());
        }

        return UserDetailsImpl.build(user);
    }

    @Override
    @Transactional
    public LoginResponseVO login(LoginRequest loginRequest) {
        try {
            User user = userRepository.findByEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new UsernameNotFoundException(
                            "User not found with email: " + loginRequest.getEmail()));

            if (!user.getIsActive()) {
                throw new RuntimeException("Account is deactivated");
            }

            if (user.getLockedUntil() != null && user.getLockedUntil().isAfter(Instant.now())) {
                throw new RuntimeException("Account is temporarily locked until " + user.getLockedUntil());
            }

            if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPasswordHash())) {
                log.error("Password mismatch for email: {}, hash length: {}, hash prefix: {}",
                        loginRequest.getEmail(),
                        user.getPasswordHash() != null ? user.getPasswordHash().length() : 0,
                        user.getPasswordHash() != null ? user.getPasswordHash().substring(0, Math.min(10, user.getPasswordHash().length())) : "NULL");
                throw new BadCredentialsException("Bad credentials");
            }

            UserDetailsImpl userDetails = UserDetailsImpl.build(user);
            Authentication authentication = new UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);

            String accessToken = tokenService.generateAccessToken(userDetails);

            RefreshToken refreshToken;
            try {
                refreshToken = refreshTokenService.createRefreshToken(user);
            } catch (DataIntegrityViolationException ex) {
                log.warn("Constraint violation creating refresh token, checking for existing tokens");
                List<RefreshToken> activeTokens = refreshTokenService.findActiveTokensByUser(user);
                if (activeTokens.isEmpty()) {
                    throw new RuntimeException("Could not create or find valid refresh token");
                }
                refreshToken = activeTokens.get(0);
            }

            String role = user.getRole().getName();

            return LoginResponseVO.builder()
                    .accessToken(accessToken)
                    .refreshToken(refreshToken.getToken())
                    .id(userDetails.getId())
                    .email(userDetails.getEmail())
                    .role(role)
                    .build();
        } catch (Exception e) {
            log.error("Authentication error: ", e);
            throw e;
        }
    }
}
