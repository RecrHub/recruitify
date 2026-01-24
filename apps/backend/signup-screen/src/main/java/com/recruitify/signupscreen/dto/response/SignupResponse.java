package com.recruitify.signupscreen.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SignupResponse {

    private String message;
    private String email;
    private String fullName;
    private String phone;
    private String role;
}
