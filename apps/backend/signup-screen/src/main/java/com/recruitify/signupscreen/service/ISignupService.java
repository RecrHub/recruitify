package com.recruitify.signupscreen.service;

import com.recruitify.signupscreen.dto.request.SignupRequest;
import com.recruitify.signupscreen.dto.response.SignupResponse;

public interface ISignupService {

    SignupResponse signup(SignupRequest request);
}
