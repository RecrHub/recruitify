package com.recruitify.webapi.common.auth.service;

import com.recruitify.webapi.common.auth.dto.LoginRequest;
import com.recruitify.webapi.common.auth.dto.LoginResponse;
import com.recruitify.webapi.common.event.AuthenticationEvent;
import com.recruitify.webapi.common.exception.AccountDeactivatedException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

/**
 * Controller-side helper that captures the cross-role login boilerplate:
 * <ul>
 *   <li>Invokes the role-specific {@link ILoginService}.</li>
 *   <li>Publishes {@link AuthenticationEvent} on success and failure.</li>
 *   <li>Translates raw client IP for the audit log.</li>
 * </ul>
 *
 * <p>Each role-specific {@code LoginController} wires this helper and only
 * declares its own path mapping, bean qualifier, and OpenAPI metadata.
 */
@Component
@RequiredArgsConstructor
public class LoginEndpointSupport {

    private final ApplicationEventPublisher eventPublisher;

    /**
     * Run the login flow and emit audit events.
     *
     * @param source       the calling controller (used as the event source)
     * @param loginService the role-specific service to delegate to
     * @param request      the login payload
     * @param httpRequest  the HTTP request (for client IP capture)
     * @param successLabel human-readable label for success log, e.g. "Admin login successful"
     * @return the response to return to the client
     */
    public LoginResponse handleLogin(
            Object source,
            ILoginService loginService,
            LoginRequest request,
            HttpServletRequest httpRequest,
            String successLabel) {

        try {
            LoginResponse response = loginService.login(request);
            eventPublisher.publishEvent(new AuthenticationEvent(
                    source,
                    request.getEmail(),
                    AuthenticationEvent.AuthEventType.LOGIN_SUCCESS,
                    successLabel,
                    getClientIp(httpRequest)));
            return response;
        } catch (AccountDeactivatedException e) {
            eventPublisher.publishEvent(new AuthenticationEvent(
                    source,
                    request.getEmail(),
                    AuthenticationEvent.AuthEventType.LOGIN_FAILED,
                    "Account deactivated",
                    getClientIp(httpRequest)));
            throw e;
        } catch (BadCredentialsException | UsernameNotFoundException e) {
            eventPublisher.publishEvent(new AuthenticationEvent(
                    source,
                    request.getEmail(),
                    AuthenticationEvent.AuthEventType.LOGIN_FAILED,
                    "Invalid credentials",
                    getClientIp(httpRequest)));
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
