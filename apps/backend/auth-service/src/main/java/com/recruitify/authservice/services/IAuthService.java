package com.recruitify.authservice.services;

import com.recruitify.authservice.dtos.Request.LoginRequest;
import com.recruitify.authservice.dtos.Request.RefreshTokenRequest;
import com.recruitify.authservice.dtos.Request.RegisterRequest;
import com.recruitify.authservice.dtos.Response.JwtResponse;
import com.recruitify.authservice.dtos.Response.MessageResponse;

public interface IAuthService {
    JwtResponse authenticateUser(LoginRequest loginRequest);
    JwtResponse refreshToken(RefreshTokenRequest refreshTokenRequest);
    MessageResponse registerUser(RegisterRequest registerRequest);
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
}
