package com.recruitify.resetpasswordscreen.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResetPasswordResponse {

    private boolean success;
    private String message;

    public static ResetPasswordResponse success(String message) {
        return ResetPasswordResponse.builder()
                .success(true)
                .message(message)
                .build();
    }

    public static ResetPasswordResponse error(String message) {
        return ResetPasswordResponse.builder()
                .success(false)
                .message(message)
                .build();
    }
}
