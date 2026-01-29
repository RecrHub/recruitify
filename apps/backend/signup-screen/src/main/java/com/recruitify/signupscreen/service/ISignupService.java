package com.recruitify.signupscreen.service;

import com.recruitify.common.vo.MessageResponse;
import com.recruitify.signupscreen.dto.request.SignupRequest;

public interface ISignupService {

    MessageResponse registerUser(SignupRequest request);
    boolean existsByEmail(String email);
}
