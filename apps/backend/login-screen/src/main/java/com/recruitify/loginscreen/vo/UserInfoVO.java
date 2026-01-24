package com.recruitify.loginscreen.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * User information VO
 * Output data chứa thông tin user
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoVO {

    /**
     * User ID
     */
    private Long id;

    /**
     * Username
     */
    private String username;

    /**
     * Email address
     */
    private String email;

    /**
     * Full name
     */
    private String fullName;

    /**
     * Phone number
     */
    private String phone;

    /**
     * User role
     */
    private String role;

    /**
     * Account active status
     */
    private Boolean isActive;
}
