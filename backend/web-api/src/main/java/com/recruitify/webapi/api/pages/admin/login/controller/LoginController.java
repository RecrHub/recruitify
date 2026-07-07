package com.recruitify.webapi.api.pages.admin.login.controller;

import com.recruitify.webapi.common.auth.dto.LoginRequest;
import com.recruitify.webapi.common.auth.dto.LoginResponse;
import com.recruitify.webapi.common.auth.service.ILoginService;
import com.recruitify.webapi.common.auth.service.LoginEndpointSupport;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Admin login controller.
 *
 * Exposes {@code POST /api/v1/admin/auth/login} — a separate endpoint from the
 * public User login ({@code /api/v1/auth/login}) and HR login
 * ({@code /api/v1/hr/auth/login}) so we can enforce strict ROLE_ADMIN access
 * and emit admin-specific audit events.
 *
 * <p>Cross-role login boilerplate (event publishing, IP capture, exception
 * translation) is delegated to {@link LoginEndpointSupport}.
 */
@RestController("adminLoginController")
@RequestMapping("/api/v1/admin/auth")
@RequiredArgsConstructor
@Tag(name = "Admin Authentication", description = "Admin login APIs")
public class LoginController {

    private final ILoginService adminLoginService;
    private final LoginEndpointSupport loginEndpointSupport;

    @PostMapping("/login")
    @Operation(
            summary = "Authenticate admin account",
            description = "Authenticate an admin account with email and password, returns JWT token",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Successfully authenticated",
                            content = @Content(schema = @Schema(implementation = LoginResponse.class))),
                    @ApiResponse(responseCode = "401", description = "Invalid email/password or account is not an admin account"),
                    @ApiResponse(responseCode = "403", description = "Account is deactivated")
            }
    )
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest loginRequest,
            HttpServletRequest request) {
        LoginResponse loginResponse = loginEndpointSupport.handleLogin(
                this, adminLoginService, loginRequest, request, "Admin login successful");
        return ResponseEntity.ok(loginResponse);
    }
}
