package com.recruitify.webapi.common.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Shared login request payload used by every role-specific login endpoint
 * (public User, HR, Admin). Identical fields and validation rules across roles
 * — the only difference between flows is the role allowed to authenticate,
 * which is enforced by the role-specific service.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;
}
