package com.recruitify.signupscreen.service.impl;

import com.recruitify.signupscreen.dto.request.SignupRequest;
import com.recruitify.signupscreen.dto.response.SignupResponse;
import com.recruitify.signupscreen.service.ISignupService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SignupServiceImpl implements ISignupService {

    private final PasswordEncoder passwordEncoder;

    @Override
    public SignupResponse signup(SignupRequest request) {
        String role = request.getRole();
        if (role == null || role.isBlank()) {
            role = "ROLE_USER";
        }
        if (!role.equals("ROLE_USER") && !role.equals("ROLE_EMPLOYER")) {
            role = "ROLE_USER";
        }

        String encodedPassword = passwordEncoder.encode(request.getPassword());

        return SignupResponse.builder()
                .message("User registered successfully")
                .email(request.getEmail())
                .fullName(request.getFullName())
                .phone(request.getPhone())
                .role(role)
                .build();
    }
}
