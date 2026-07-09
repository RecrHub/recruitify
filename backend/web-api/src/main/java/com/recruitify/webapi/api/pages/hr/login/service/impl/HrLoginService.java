package com.recruitify.webapi.api.pages.hr.login.service.impl;

import com.recruitify.webapi.common.auth.service.AbstractRoleBasedLoginService;
import com.recruitify.webapi.common.repository.UserRepository;
import com.recruitify.webapi.common.token.service.IRefreshTokenService;
import com.recruitify.webapi.common.token.service.ITokenService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

/**
 * HR login flow.
 *
 * <p>Accounts whose role is {@code ROLE_HR}, {@code ROLE_EMPLOYER}, or
 * {@code ROLE_RECRUITER} are accepted. Anything else (e.g. a candidate
 * account) gets a generic
 * {@link org.springframework.security.authentication.BadCredentialsException}.
 */
@Service("hrLoginService")
public class HrLoginService extends AbstractRoleBasedLoginService {

    /** Roles allowed to authenticate through the HR login endpoint. */
    private static final Set<String> HR_ROLES =
            Set.of("ROLE_HR", "ROLE_EMPLOYER", "ROLE_RECRUITER");

    public HrLoginService(UserRepository userRepository,
                          PasswordEncoder passwordEncoder,
                          ITokenService tokenService,
                          IRefreshTokenService refreshTokenService) {
        super(userRepository, passwordEncoder, tokenService, refreshTokenService);
    }

    @Override
    protected boolean isRoleAllowed(String role) {
        return role != null && HR_ROLES.contains(role.toUpperCase());
    }

    @Override
    protected String roleLabel() {
        return "HR";
    }
}
