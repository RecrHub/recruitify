package com.recruitify.resetpasswordscreen.service;

import com.recruitify.resetpasswordscreen.dto.request.ResetPasswordRequest;
import com.recruitify.resetpasswordscreen.vo.ResetPasswordVO;

public interface IResetPasswordService {

    ResetPasswordVO resetPassword(ResetPasswordRequest request);

    ResetPasswordVO validateToken(String token);
}
