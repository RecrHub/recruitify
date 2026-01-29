package com.recruitify.common.token.service;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;

public interface ITokenService {
    String generateAccessToken(UserDetails userDetails);

    String generateRefreshToken(UserDetails userDetails);

    String getUsernameFromToken(String token);

    boolean validateToken(String token);

    Authentication getAuthentication(String token);
}
