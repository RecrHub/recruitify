package com.recruitify.webapi.api.pages.hr.login.controller;

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
 * HR login controller.
 *
 * Exposes {@code POST /api/v1/hr/auth/login} — a separate endpoint from the
 * public User login ({@code /api/v1/auth/login}) so we can:
 * <ul>
 *   <li>Apply HR-only rules (role enforcement, future company-scope checks)</li>
 *   <li>Emit HR-specific audit events for the security team</li>
 *   <li>De-risk HR schema changes from the much higher-traffic User path</li>
 * </ul>
 *
 * <p>Cross-role login boilerplate is delegated to {@link LoginEndpointSupport}.
 */
@RestController("hrLoginController")
@RequestMapping("/api/v1/hr/auth")
@RequiredArgsConstructor
@Tag(name = "HR Authentication", description = "HR/Employer login APIs")
public class LoginController {

    private final ILoginService hrLoginService;
    private final LoginEndpointSupport loginEndpointSupport;

    @PostMapping("/login")
    @Operation(
            summary = "Authenticate HR account",
            description = "Authenticate an HR/Employer account with email and password, returns JWT token",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Successfully authenticated",
                            content = @Content(schema = @Schema(implementation = LoginResponse.class))),
                    @ApiResponse(responseCode = "401", description = "Invalid email/password or account is not an HR account"),
                    @ApiResponse(responseCode = "403", description = "Account is deactivated")
            }
    )
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest loginRequest,
            HttpServletRequest request) {
        LoginResponse loginResponse = loginEndpointSupport.handleLogin(
                this, hrLoginService, loginRequest, request, "HR login successful");
        return ResponseEntity.ok(loginResponse);
    }
}
