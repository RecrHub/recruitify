package com.recruitify.loginscreen.service;

import com.recruitify.loginscreen.dto.request.LoginRequest;
import com.recruitify.loginscreen.dto.request.RefreshTokenRequest;
import com.recruitify.loginscreen.dto.response.LoginResponse;

public interface ILoginService {

    LoginResponse login(LoginRequest request);

    LoginResponse refreshToken(RefreshTokenRequest request);
}
