package com.recruitify.forgetpasswordscreen.service;

import com.recruitify.forgetpasswordscreen.dto.request.ForgetPasswordRequest;
import com.recruitify.forgetpasswordscreen.dto.response.ForgetPasswordResponse;

public interface IForgetPasswordService {

    ForgetPasswordResponse sendResetPasswordEmail(ForgetPasswordRequest request);
}
