package com.recruitify.webapi.common.token.service;

import com.recruitify.webapi.common.model.identity.RefreshToken;
import com.recruitify.webapi.common.model.identity.User;

import java.util.List;
import java.util.Optional;

public interface IRefreshTokenService {
    Optional<RefreshToken> findByToken(String token);

    RefreshToken createRefreshToken(User user);

    RefreshToken verifyExpiration(RefreshToken token);

    List<RefreshToken> findActiveTokensByUser(User user);

    RefreshToken useToken(RefreshToken token, String replacedByToken);
}
