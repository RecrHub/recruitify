package com.recruitify.webapi.api.pages.hr.login.controllers;

import com.recruitify.webapi.api.pages.hr.login.dto.request.LoginRequest;
import com.recruitify.webapi.api.pages.hr.login.dto.response.LoginResponseVO;
import com.recruitify.webapi.api.pages.hr.login.service.ILoginService;
import com.recruitify.webapi.common.event.AuthenticationEvent;
import com.recruitify.webapi.common.exception.AccountDeactivatedException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
 */
@RestController("hrLoginController")
@RequestMapping("/api/v1/hr/auth")
@RequiredArgsConstructor
@Tag(name = "HR Authentication", description = "HR/Employer login APIs")
public class LoginController {

    private final ILoginService hrLoginService;
    private final ApplicationEventPublisher eventPublisher;

    @PostMapping("/login")
    @Operation(
            summary = "Authenticate HR account",
            description = "Authenticate an HR/Employer account with email and password, returns JWT token",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Successfully authenticated",
                            content = @Content(schema = @Schema(implementation = LoginResponseVO.class))),
                    @ApiResponse(responseCode = "401", description = "Invalid email/password or account is not an HR account"),
                    @ApiResponse(responseCode = "403", description = "Account is deactivated")
            }
    )
    public ResponseEntity<LoginResponseVO> login(
            @Valid @RequestBody LoginRequest loginRequest,
            HttpServletRequest request) {
        try {
            LoginResponseVO loginResponse = hrLoginService.login(loginRequest);
            eventPublisher.publishEvent(new AuthenticationEvent(
                    this,
                    loginRequest.getEmail(),
                    AuthenticationEvent.AuthEventType.LOGIN_SUCCESS,
                    "HR login successful",
                    getClientIp(request)));
            return ResponseEntity.ok(loginResponse);
        } catch (AccountDeactivatedException e) {
            eventPublisher.publishEvent(new AuthenticationEvent(
                    this,
                    loginRequest.getEmail(),
                    AuthenticationEvent.AuthEventType.LOGIN_FAILED,
                    "Account deactivated",
                    getClientIp(request)));
            throw e;
        } catch (BadCredentialsException | UsernameNotFoundException e) {
            eventPublisher.publishEvent(new AuthenticationEvent(
                    this,
                    loginRequest.getEmail(),
                    AuthenticationEvent.AuthEventType.LOGIN_FAILED,
                    "Invalid credentials",
                    getClientIp(request)));
            throw e;
        }
    }

    private String getClientIp(HttpServletRequest request) {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader == null) {
            return request.getRemoteAddr();
        }
        return xfHeader.split(",")[0];
    }
}
