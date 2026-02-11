package com.recruitify.webapi.api.pages.forgetpassword.service;

import com.recruitify.webapi.api.pages.forgetpassword.dto.request.ForgetPasswordRequest;
import com.recruitify.webapi.api.pages.forgetpassword.dto.response.ForgetPasswordResponse;

public interface IForgetPasswordService {

    ForgetPasswordResponse sendResetPasswordEmail(ForgetPasswordRequest request);
}
