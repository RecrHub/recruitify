package com.recruitify.webapi.api.pages.admin.auth.service.impl;

import com.recruitify.webapi.common.auth.service.AbstractRoleBasedLoginService;
import com.recruitify.webapi.common.repository.UserRepository;
import com.recruitify.webapi.common.token.service.IRefreshTokenService;
import com.recruitify.webapi.common.token.service.ITokenService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Admin login flow.
 *
 * <p>Only accounts whose role is {@code ROLE_ADMIN} are accepted. Non-admin
 * accounts get a generic {@link org.springframework.security.authentication.BadCredentialsException}
 * so we don't leak existence/role information to an attacker.
 *
 * <p>All cross-role plumbing (active/locked checks, password verification,
 * token issuance, response assembly) lives in
 * {@link AbstractRoleBasedLoginService}.
 */
@Service("adminLoginService")
public class AdminLoginService extends AbstractRoleBasedLoginService {

    /** Role allowed to authenticate through the admin login endpoint. */
    private static final String ADMIN_ROLE = "ROLE_ADMIN";

    public AdminLoginService(UserRepository userRepository,
                             PasswordEncoder passwordEncoder,
                             ITokenService tokenService,
                             IRefreshTokenService refreshTokenService) {
        super(userRepository, passwordEncoder, tokenService, refreshTokenService);
    }

    @Override
    protected boolean isRoleAllowed(String role) {
        return ADMIN_ROLE.equalsIgnoreCase(role);
    }

    @Override
    protected String roleLabel() {
        return "Admin";
    }
}
