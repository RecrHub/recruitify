package com.recruitify.common.token.service;

import com.recruitify.common.config.JwtConfig;
import com.recruitify.common.exception.TokenRefreshException;
import com.recruitify.common.model.identity.RefreshToken;
import com.recruitify.common.model.identity.User;
import com.recruitify.common.token.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class RefreshTokenService implements IRefreshTokenService {
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtConfig jwtConfig;

    @Override
    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    @Override
    @Transactional
    public RefreshToken createRefreshToken(User user) {
        String newToken = UUID.randomUUID().toString();

        try {
            List<RefreshToken> activeTokens = refreshTokenRepository.findByUserAndIsRevokedFalseAndIsUsedFalse(user);

            if (!activeTokens.isEmpty()) {
                activeTokens.forEach(token -> {
                    token.setRevoked(true);
                    token.setReasonRevoked("Superseded by new token");
                    token.setReplacedByToken(newToken);
                });
                refreshTokenRepository.saveAll(activeTokens);
                log.debug("Revoked {} previous active tokens for user: {}", activeTokens.size(), user.getEmail());
            }

            RefreshToken refreshToken = RefreshToken.builder()
                    .user(user)
                    .token(newToken)
                    .expiryDate(Instant.now().plusMillis(jwtConfig.getRefreshExpirationMs()))
                    .isUsed(false)
                    .isRevoked(false)
                    .build();

            RefreshToken savedToken = refreshTokenRepository.save(refreshToken);
            log.info("New refresh token created for email: {}", user.getEmail());

            return savedToken;
        } catch (DataIntegrityViolationException ex) {
            log.error("Could not create refresh token for email {}: {}", user.getEmail(), ex.getMessage());

            List<RefreshToken> existingTokens = refreshTokenRepository.findByUser(user);
            if (!existingTokens.isEmpty()) {
                RefreshToken latestToken = existingTokens.stream()
                        .max((a, b) -> a.getCreatedAt().compareTo(b.getCreatedAt()))
                        .orElseThrow();

                if (!latestToken.isActive()) {
                    latestToken.setUsed(false);
                    latestToken.setRevoked(false);
                    latestToken.setExpiryDate(Instant.now().plusMillis(jwtConfig.getRefreshExpirationMs()));
                    return refreshTokenRepository.save(latestToken);
                }

                return latestToken;
            }

            throw new RuntimeException("Failed to create refresh token", ex);
        }
    }

    @Override
    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.isExpired()) {
            refreshTokenRepository.delete(token);
            throw new TokenRefreshException(token.getToken(), "Refresh token was expired. Please make a new login request");
        }

        if (token.isRevoked()) {
            throw new TokenRefreshException(token.getToken(), "Refresh token was revoked");
        }

        if (token.isUsed()) {
            throw new TokenRefreshException(token.getToken(), "Refresh token was already used");
        }

        return token;
    }

    @Override
    public List<RefreshToken> findActiveTokensByUser(User user) {
        return refreshTokenRepository.findByUserAndIsRevokedFalseAndIsUsedFalse(user);
    }

    @Override
    @Transactional
    public RefreshToken useToken(RefreshToken token, String replacedByToken) {
        token.setUsed(true);
        token.setReplacedByToken(replacedByToken);
        return refreshTokenRepository.save(token);
    }
}
