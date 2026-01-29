package com.recruitify.common.token.repository;

import com.recruitify.common.model.identity.RefreshToken;
import com.recruitify.common.model.identity.User;
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
