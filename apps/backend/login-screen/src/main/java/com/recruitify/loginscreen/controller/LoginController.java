package com.recruitify.loginscreen.controller;

import com.recruitify.common.event.AuthenticationEvent;
import com.recruitify.common.exception.AccountDeactivatedException;
import com.recruitify.loginscreen.dto.request.LoginRequest;
import com.recruitify.loginscreen.service.ILoginService;
import com.recruitify.loginscreen.vo.LoginResponseVO;
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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@Tag(name = "Authentication", description = "Authentication management APIs")
public class LoginController {

    private final ILoginService loginService;
    private final ApplicationEventPublisher eventPublisher;

    public LoginController(ILoginService loginService, ApplicationEventPublisher eventPublisher) {
        this.loginService = loginService;
        this.eventPublisher = eventPublisher;
    }

    @PostMapping("/login")
    @Operation(summary = "Authenticate user", description = "Authenticate user with username and password, returns JWT token", responses = {
            @ApiResponse(responseCode = "200", description = "Successfully authenticated", content = @Content(schema = @Schema(implementation = LoginResponseVO.class))),
            @ApiResponse(responseCode = "401", description = "Invalid username or password")
    })
    public ResponseEntity<LoginResponseVO> login(
            @Valid @RequestBody LoginRequest loginRequest,
            HttpServletRequest request) {
        try {
            LoginResponseVO loginResponse = loginService.login(loginRequest);
            // Publish successful login event
            eventPublisher.publishEvent(new AuthenticationEvent(
                    this,
                    loginRequest.getEmail(),
                    AuthenticationEvent.AuthEventType.LOGIN_SUCCESS,
                    "Login successful",
                    getClientIp(request)));
            return ResponseEntity.ok(loginResponse);
        } catch (AccountDeactivatedException e) {
            // Publish failed login event with specific reason
            eventPublisher.publishEvent(new AuthenticationEvent(
                    this,
                    loginRequest.getEmail(),
                    AuthenticationEvent.AuthEventType.LOGIN_FAILED,
                    "Account deactivated",
                    getClientIp(request)));
            throw e;
        } catch (BadCredentialsException e) {
            // Publish failed login event
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
