package com.recruitify.webapi.common.token.repository;

import com.recruitify.webapi.common.model.identity.RefreshToken;
import com.recruitify.webapi.common.model.identity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByToken(String token);

    List<RefreshToken> findByUser(User user);

    List<RefreshToken> findByUserAndIsRevokedFalseAndIsUsedFalse(User user);
}
