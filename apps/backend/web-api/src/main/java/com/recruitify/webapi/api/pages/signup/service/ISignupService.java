package com.recruitify.webapi.api.pages.signup.service;

import com.recruitify.webapi.api.pages.signup.dto.request.SignupRequest;
import com.recruitify.webapi.common.vo.MessageResponse;

public interface ISignupService {

    MessageResponse registerUser(SignupRequest request);
    boolean existsByEmail(String email);
}
