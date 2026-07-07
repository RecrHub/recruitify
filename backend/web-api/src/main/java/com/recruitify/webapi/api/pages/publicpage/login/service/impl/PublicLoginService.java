package com.recruitify.webapi.api.pages.publicpage.login.service.impl;

import com.recruitify.webapi.common.auth.service.AbstractRoleBasedLoginService;
import com.recruitify.webapi.common.repository.UserRepository;
import com.recruitify.webapi.common.token.service.IRefreshTokenService;
import com.recruitify.webapi.common.token.service.ITokenService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

/**
 * Public User login flow.
 *
 * <p>HR/Employer/Recruiter accounts are blocked here — they must use
 * {@code /api/v1/hr/auth/login} instead. A blocked account receives a
 * generic {@link org.springframework.security.authentication.BadCredentialsException}
 * so we don't leak that the email belongs to an HR account.
 */
@Service("loginService")
public class PublicLoginService extends AbstractRoleBasedLoginService {

    /**
     * Roles that are NOT allowed to authenticate through the public User login
     * endpoint. HR/Employer/Recruiter accounts must use
     * {@code /api/v1/hr/auth/login} instead so role-specific rules and audit
     * events apply.
     */
    private static final Set<String> NON_USER_ROLES =
            Set.of("ROLE_HR", "ROLE_EMPLOYER", "ROLE_RECRUITER");

    public PublicLoginService(UserRepository userRepository,
                              PasswordEncoder passwordEncoder,
                              ITokenService tokenService,
                              IRefreshTokenService refreshTokenService) {
        super(userRepository, passwordEncoder, tokenService, refreshTokenService);
    }

    @Override
    protected boolean isRoleAllowed(String role) {
        return role != null && !NON_USER_ROLES.contains(role.toUpperCase());
    }

    @Override
    protected String roleLabel() {
        return "User";
    }
}
