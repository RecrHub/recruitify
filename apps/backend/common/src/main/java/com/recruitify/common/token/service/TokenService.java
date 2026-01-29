package com.recruitify.common.token.service;

import com.recruitify.common.config.JwtConfig;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class TokenService implements ITokenService {
    private final JwtConfig jwtConfig;

    @Override
    public String generateAccessToken(UserDetails userDetails) {
        return generateToken(userDetails, jwtConfig.getExpirationMs());
    }

    @Override
    public String generateRefreshToken(UserDetails userDetails) {
        return generateToken(userDetails, jwtConfig.getRefreshExpirationMs());
    }

    private String generateToken(UserDetails userDetails, long expirationMs) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", userDetails.getAuthorities());

        return Jwts.builder()
                .claims(claims)
                .subject(userDetails.getUsername())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(getSigningKey())
                .compact();
    }

    @Override
    public String getUsernameFromToken(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    @Override
    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (SignatureException e) {
            log.error("Invalid JWT signature: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            log.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            log.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            log.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            log.error("JWT claims string is empty: {}", e.getMessage());
        }
        return false;
    }

    @Override
    public Authentication getAuthentication(String token) {
        if (token == null) {
            return null;
        }

        try {
            Claims claims = Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();

            String username = claims.getSubject();

            @SuppressWarnings("unchecked")
            List<Map<String, String>> rolesMap = (List<Map<String, String>>) claims.get("roles");

            Collection<GrantedAuthority> authorities = rolesMap != null ? rolesMap.stream()
                    .map(role -> new SimpleGrantedAuthority(role.get("authority")))
                    .collect(Collectors.toList()) : Collections.emptyList();

            User principal = new User(username, "", authorities);

            return new UsernamePasswordAuthenticationToken(principal, token, authorities);
        } catch (Exception e) {
            log.error("Authentication error: {}", e.getMessage());
            return null;
        }
    }

    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(jwtConfig.getSecret());
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
