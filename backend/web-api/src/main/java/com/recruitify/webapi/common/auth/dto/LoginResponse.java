package com.recruitify.webapi.common.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Shared authentication response payload.
 *
 * Used by:
 * <ul>
 *   <li>{@code POST /api/v1/auth/login} (public User login)</li>
 *   <li>{@code POST /api/v1/hr/auth/login} (HR login)</li>
 *   <li>{@code POST /api/v1/admin/auth/login} (Admin login)</li>
 *   <li>{@code POST /api/v1/token/refresh} (token refresh)</li>
 * </ul>
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {

    /** JWT access token. */
    private String accessToken;

    /** Refresh token used to obtain a new access token. */
    private String refreshToken;

    /** Token type (always "Bearer"). */
    @Builder.Default
    private String tokenType = "Bearer";

    /** Authenticated user's id. */
    private long id;

    /** Authenticated user's email. */
    private String email;

    /** Authenticated user's role name (e.g. ROLE_USER, ROLE_ADMIN). */
    private String role;
}
