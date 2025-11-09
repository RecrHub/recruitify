package com.recruitify.services;

import com.recruitify.dtos.Request.RegisterRequest;
import com.recruitify.dtos.Response.MessageResponse;

public interface IAuthService {
    MessageResponse registerUser(RegisterRequest registerRequest);
    boolean existsByEmail(String email);
}
