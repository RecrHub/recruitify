package com.recruitify.resetpasswordscreen.service;

import com.recruitify.resetpasswordscreen.dto.request.ResetPasswordRequest;
import com.recruitify.resetpasswordscreen.dto.response.ResetPasswordResponse;

public interface IResetPasswordService {

    ResetPasswordResponse resetPassword(ResetPasswordRequest request);

    ResetPasswordResponse validateToken(String token);
}
