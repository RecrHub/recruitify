package com.recruitify.webapi.api.pages.hr.login.service;

import com.recruitify.webapi.api.pages.hr.login.dto.request.LoginRequest;
import com.recruitify.webapi.api.pages.hr.login.dto.response.LoginResponseVO;

/**
 * HR login service contract.
 * Separate from the public User login flow so HR-specific rules
 * (role enforcement, future company-scope checks, audit) can be added
 * without touching the User login path.
 */
public interface ILoginService {
    LoginResponseVO login(LoginRequest request);
}
