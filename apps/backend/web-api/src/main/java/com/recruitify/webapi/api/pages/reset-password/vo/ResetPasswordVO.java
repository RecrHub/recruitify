package com.recruitify.webapi.api.pages.resetpassword.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResetPasswordVO {

    private boolean success;
    private String message;

    public static ResetPasswordVO success(String message) {
        return ResetPasswordVO.builder()
                .success(true)
                .message(message)
                .build();
    }

    public static ResetPasswordVO error(String message) {
        return ResetPasswordVO.builder()
                .success(false)
                .message(message)
                .build();
    }
}
