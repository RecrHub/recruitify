package com.recruitify.webapi.api.pages.resetpassword.service;

import com.recruitify.webapi.api.pages.resetpassword.dto.request.ResetPasswordRequest;
import com.recruitify.webapi.api.pages.resetpassword.vo.ResetPasswordVO;

public interface IResetPasswordService {

    ResetPasswordVO resetPassword(ResetPasswordRequest request);

    ResetPasswordVO validateToken(String token);
}
