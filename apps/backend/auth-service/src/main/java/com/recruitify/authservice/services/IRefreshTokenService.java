package com.recruitify.authservice.services;

import com.recruitify.authservice.model.RefreshToken;
import com.recruitify.authservice.model.User;

import java.util.List;
import java.util.Optional;

public interface IRefreshTokenService {
    Optional<RefreshToken> findByToken(String token);
    RefreshToken createRefreshToken(User user);
    RefreshToken verifyExpiration(RefreshToken token);
    List<RefreshToken> findActiveTokensByUser(User user);
    RefreshToken useToken(RefreshToken token, String replacedByToken);
}
