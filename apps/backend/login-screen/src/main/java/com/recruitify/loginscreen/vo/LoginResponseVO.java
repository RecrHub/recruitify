package com.recruitify.loginscreen.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Login response VO
 * Output data trả về khi login thành công
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponseVO {

    /**
     * JWT access token
     */
    private String accessToken;

    /**
     * Refresh token for getting new access token
     */
    private String refreshToken;

    /**
     * Token type (usually "Bearer")
     */
    @Builder.Default
    private String tokenType = "Bearer";

    /**
     * Access token expiration time in seconds
     */
    private long id;
    private String email;
    private String role;
}
