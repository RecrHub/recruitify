package com.recruitify.forgetpasswordscreen.repository;

import com.recruitify.common.model.identity.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    Optional<PasswordResetToken> findByToken(String token);
    Optional<PasswordResetToken> findByEmailAndUsedFalse(String email);
    void deleteByEmail(String email);
}
