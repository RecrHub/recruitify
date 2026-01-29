package com.recruitify.signupscreen.controller;

import com.recruitify.common.vo.MessageResponse;
import com.recruitify.signupscreen.dto.request.SignupRequest;
import com.recruitify.signupscreen.service.ISignupService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.recruitify.common.event.AuthenticationEvent;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Signup", description = "User registration API")
public class SignupController {

    private final ISignupService signupService;
    private final ApplicationEventPublisher eventPublisher;

    @PostMapping("/register")
    @Operation(
            summary = "Register new user",
            description = "Register a new user with provided details",
            responses = {
                    @ApiResponse(
                            responseCode = "201",
                            description = "User registered successfully",
                            content = @Content(schema = @Schema(implementation = MessageResponse.class))
                    ),
                    @ApiResponse(
                            responseCode = "400",
                            description = "Invalid data or username/email already in use"
                    )
            }
    )
    public ResponseEntity<MessageResponse> register(
            @Valid @RequestBody SignupRequest registerRequest,
            HttpServletRequest request) {
        MessageResponse response = signupService.registerUser(registerRequest);

        if (response.isSuccess()) {
            eventPublisher.publishEvent(new AuthenticationEvent(
                    this,
                    registerRequest.getEmail(),
                    AuthenticationEvent.AuthEventType.REGISTER_SUCCESS,
                    "Registration successful",
                    getClientIp(request)
            ));
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }

    //getIp Address
    private String getClientIp(HttpServletRequest request) {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader == null) {
            return request.getRemoteAddr();
        }
        return xfHeader.split(",")[0];
    }
}
