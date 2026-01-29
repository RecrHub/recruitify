package com.recruitify.loginscreen.service;

import com.recruitify.loginscreen.dto.request.LoginRequest;
import com.recruitify.loginscreen.vo.LoginResponseVO;

public interface ILoginService {
    LoginResponseVO login(LoginRequest request);
}
