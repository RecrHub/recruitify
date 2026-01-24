package com.recruitify.forgetpasswordscreen.controller;

import com.recruitify.forgetpasswordscreen.dto.request.ForgetPasswordRequest;
import com.recruitify.forgetpasswordscreen.dto.response.ForgetPasswordResponse;
import com.recruitify.forgetpasswordscreen.service.IForgetPasswordService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/forget-password")
@RequiredArgsConstructor
@Tag(name = "Forget Password", description = "Forget Password Management APIs")
public class ForgetPasswordController {

    private final IForgetPasswordService forgetPasswordService;

    @PostMapping
    @Operation(summary = "Send password reset email", description = "Sends a password reset link to the provided email address")
    public ResponseEntity<ForgetPasswordResponse> sendResetPasswordEmail(
            @Valid @RequestBody ForgetPasswordRequest request) {
        return ResponseEntity.ok(forgetPasswordService.sendResetPasswordEmail(request));
    }
}
