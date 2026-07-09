package com.recruitify.webapi.api.pages.publicpage.login.controller;

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
 * Public User login controller.
 *
 * Exposes {@code POST /api/v1/auth/login}. HR/Employer/Recruiter accounts
 * are rejected here and must use {@code /api/v1/hr/auth/login} instead.
 *
 * <p>Cross-role login boilerplate is delegated to {@link LoginEndpointSupport}.
 */
@RestController("userLoginController")
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Authentication management APIs")
public class LoginController {

    private final ILoginService loginService;
    private final LoginEndpointSupport loginEndpointSupport;

    @PostMapping("/login")
    @Operation(
            summary = "Authenticate user",
            description = "Authenticate user with username and password, returns JWT token",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Successfully authenticated",
                            content = @Content(schema = @Schema(implementation = LoginResponse.class))),
                    @ApiResponse(responseCode = "401", description = "Invalid username or password")
            }
    )
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest loginRequest,
            HttpServletRequest request) {
        LoginResponse loginResponse = loginEndpointSupport.handleLogin(
                this, loginService, loginRequest, request, "Login successful");
        return ResponseEntity.ok(loginResponse);
    }
}
