package com.recruitify.webapi.api.pages.publicpage.login.service;

import com.recruitify.webapi.api.pages.publicpage.login.dto.request.LoginRequest;
import com.recruitify.webapi.api.pages.publicpage.login.vo.LoginResponseVO;

public interface ILoginService {
    LoginResponseVO login(LoginRequest request);
}
