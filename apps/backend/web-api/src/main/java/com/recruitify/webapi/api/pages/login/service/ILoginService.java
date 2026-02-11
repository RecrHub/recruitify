package com.recruitify.webapi.api.pages.login.service;

import com.recruitify.webapi.api.pages.login.dto.request.LoginRequest;
import com.recruitify.webapi.api.pages.login.vo.LoginResponseVO;

public interface ILoginService {
    LoginResponseVO login(LoginRequest request);
}
