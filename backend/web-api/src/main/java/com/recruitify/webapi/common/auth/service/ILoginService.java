package com.recruitify.webapi.common.auth.service;

import com.recruitify.webapi.common.auth.dto.LoginRequest;
import com.recruitify.webapi.common.auth.dto.LoginResponse;

/**
 * Contract implemented by every role-specific login service
 * (User, HR, Admin). Each implementation enforces its own role rule
 * via {@link AbstractRoleBasedLoginService#isRoleAllowed(String)}.
 */
public interface ILoginService {
    LoginResponse login(LoginRequest request);
}
