package com.recruitify.resetpasswordscreen.controller;

import com.recruitify.resetpasswordscreen.dto.request.ResetPasswordRequest;
import com.recruitify.resetpasswordscreen.vo.ResetPasswordVO;
import com.recruitify.resetpasswordscreen.service.IResetPasswordService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/reset-password")
@RequiredArgsConstructor
@Tag(name = "Reset Password", description = "Password reset management APIs")
public class ResetPasswordController {

    private final IResetPasswordService resetPasswordService;

    @PostMapping
    @Operation(summary = "Reset password", description = "Reset user password using the token received via email")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Password reset successful"),
            @ApiResponse(responseCode = "400", description = "Invalid request or token")
    })
    public ResponseEntity<ResetPasswordVO> resetPassword(
            @Valid @RequestBody ResetPasswordRequest request) {
        ResetPasswordVO response = resetPasswordService.resetPassword(request);
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.badRequest().body(response);
    }

    @GetMapping("/validate")
    @Operation(summary = "Validate reset token", description = "Validate if the reset token is valid and not expired")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Token validation result"),
            @ApiResponse(responseCode = "400", description = "Invalid token")
    })
    public ResponseEntity<ResetPasswordVO> validateToken(
            @Parameter(description = "Reset token from email") @RequestParam String token) {
        ResetPasswordVO response = resetPasswordService.validateToken(token);
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.badRequest().body(response);
    }
}
