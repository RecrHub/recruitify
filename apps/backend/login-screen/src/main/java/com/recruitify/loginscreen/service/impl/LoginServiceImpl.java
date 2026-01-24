package com.recruitify.loginscreen.service.impl;

import com.recruitify.loginscreen.dto.request.LoginRequest;
import com.recruitify.loginscreen.dto.request.RefreshTokenRequest;
import com.recruitify.loginscreen.dto.response.LoginResponse;
import com.recruitify.loginscreen.dto.response.UserInfo;
import com.recruitify.loginscreen.service.ILoginService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class LoginServiceImpl implements ILoginService {

        private final AuthenticationManager authenticationManager;

        @Value("${app.jwt.secret}")
        private String jwtSecret;

        @Value("${app.jwt.expirationMs}")
        private Long jwtExpirationMs;

        @Value("${app.jwt.refreshExpirationMs}")
        private Long refreshExpirationMs;

        @Override
        public LoginResponse login(LoginRequest loginRequest) {
                // Get Authentication
                Authentication authentication = authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),
                                                loginRequest.getPassword()));

                // Get UserDetails
                UserDetails userDetails = (UserDetails) authentication.getPrincipal();

                // Generate Access Token
                String accessToken = generateAccessToken(userDetails.getUsername());

                // Generate Refresh Token
                String refreshToken = generateRefreshToken(userDetails.getUsername());

                // Build UserInfo
                UserInfo userInfo = UserInfo.builder()
                                .id(1L)
                                .email(userDetails.getUsername())
                                .fullName("User")
                                .role(userDetails.getAuthorities().stream()
                                                .findFirst()
                                                .map(auth -> auth.getAuthority())
                                                .orElse("USER"))
                                .build();

                // Return LoginResponse
                return LoginResponse.builder()
                                .accessToken(accessToken)
                                .refreshToken(refreshToken)
                                .tokenType("Bearer")
                                .userInfo(userInfo)
                                .build();

        }

        @Override
        @Transactional
        public LoginResponse refreshToken(RefreshTokenRequest refreshTokenRequest) {
                String refreshToken = refreshTokenRequest.getRefreshToken();
                Claims claims = parseToken(refreshToken);

                String email = claims.getSubject();
                String newAccessToken = generateAccessToken(email);
                String newRefreshToken = generateRefreshToken(email);

                UserInfo userInfo = UserInfo.builder()
                                .id(1L)
                                .email(email)
                                .fullName("User")
                                .role("USER")
                                .build();

                return LoginResponse.builder()
                                .accessToken(newAccessToken)
                                .refreshToken(newRefreshToken)
                                .tokenType("Bearer")
                                .expiresIn(jwtExpirationMs / 1000)
                                .userInfo(userInfo)
                                .build();
        }

        private String generateAccessToken(String email) {
                return Jwts.builder()
                                .subject(email)
                                .issuedAt(new Date())
                                .expiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                                .signWith(getSigningKey())
                                .compact();
        }

        private String generateRefreshToken(String email) {
                return Jwts.builder()
                                .subject(email)
                                .issuedAt(new Date())
                                .expiration(new Date(System.currentTimeMillis() + refreshExpirationMs))
                                .signWith(getSigningKey())
                                .compact();
        }

        private Claims parseToken(String token) {
                return Jwts.parser()
                                .verifyWith(getSigningKey())
                                .build()
                                .parseSignedClaims(token)
                                .getPayload();
        }

        private SecretKey getSigningKey() {
                return Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
        }
}
