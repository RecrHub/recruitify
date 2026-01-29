package com.recruitify.loginscreen.service.impl;

import com.recruitify.common.model.identity.RefreshToken;
import com.recruitify.common.model.identity.User;
import com.recruitify.common.security.UserDetailsImpl;
import com.recruitify.common.token.service.IRefreshTokenService;
import com.recruitify.common.token.service.ITokenService;
import com.recruitify.loginscreen.dto.request.LoginRequest;
import com.recruitify.loginscreen.repository.IUserRepository;
import com.recruitify.loginscreen.service.ILoginService;
import com.recruitify.loginscreen.vo.LoginResponseVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class LoginService implements UserDetailsService, ILoginService {
    private final IUserRepository userRepository;
    private final IRefreshTokenService refreshTokenService;
    private final ObjectProvider<AuthenticationManager> authenticationManagerProvider;
    private final ITokenService tokenService;

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
                        // Get authentication manager lazily to avoid circular dependency
                        AuthenticationManager authenticationManager = authenticationManagerProvider.getObject();

                        // Authenticate
                        Authentication authentication = authenticationManager.authenticate(
                                        new UsernamePasswordAuthenticationToken(
                                                        loginRequest,
                                                        loginRequest.getPassword()));

                        SecurityContextHolder.getContext().setAuthentication(authentication);
                        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

                        // Generate JWT access token
                        String accessToken = tokenService.generateAccessToken(userDetails);

                        // Get user for refresh token
                        User user = userRepository.findByEmail(userDetails.getEmail())
                                        .orElseThrow(() -> new UsernameNotFoundException(
                                                        "User not found with email: " + userDetails.getEmail()));

                        // Create refresh token with retry mechanism
                        RefreshToken refreshToken;
                        try {
                                refreshToken = refreshTokenService.createRefreshToken(user);
                        } catch (DataIntegrityViolationException ex) {
                                // If we hit a constraint violation, try to find existing token
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
