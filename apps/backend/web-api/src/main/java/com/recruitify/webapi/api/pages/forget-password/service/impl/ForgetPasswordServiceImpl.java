package com.recruitify.webapi.api.pages.forgetpassword.service.impl;

import com.recruitify.webapi.api.pages.forgetpassword.dto.request.ForgetPasswordRequest;
import com.recruitify.webapi.api.pages.forgetpassword.dto.response.ForgetPasswordResponse;
import com.recruitify.webapi.common.repository.PasswordResetTokenRepository;
import com.recruitify.webapi.common.repository.UserRepository;
import com.recruitify.webapi.api.pages.forgetpassword.service.EmailService;
import com.recruitify.webapi.api.pages.forgetpassword.service.IForgetPasswordService;
import com.recruitify.webapi.common.model.identity.PasswordResetToken;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class ForgetPasswordServiceImpl implements IForgetPasswordService {

    private final UserRepository userRepository;
    private final PasswordResetTokenRepository tokenRepository;
    private final EmailService emailService;

    @Value("${app.password-reset.token-expiry-minutes:15}")
    private int tokenExpiryMinutes;

    @Override
    @Transactional
    public ForgetPasswordResponse sendResetPasswordEmail(ForgetPasswordRequest request) {
        String email = request.getEmail();
        log.info("Processing forget password request for email: {}", email);

        try {
            if (userRepository.existsByEmail(email)) {
                tokenRepository.findByEmailAndUsedFalse(email)
                        .ifPresent(existingToken -> {
                            existingToken.setUsed(true);
                            tokenRepository.save(existingToken);
                        });

                String token = UUID.randomUUID().toString();
                PasswordResetToken resetToken = PasswordResetToken.builder()
                        .token(token)
                        .email(email)
                        .expiryDate(Instant.now().plus(tokenExpiryMinutes, ChronoUnit.MINUTES))
                        .used(false)
                        .build();

                tokenRepository.save(resetToken);
                emailService.sendPasswordResetEmail(email, token);

                log.info("Password reset email sent successfully to: {}", email);
            } else {
                log.info("No account found for email: {}", email);
            }
        } catch (Exception e) {
            log.error("Error processing password reset request for email: {}", email, e);
        }

        return ForgetPasswordResponse.builder()
                .message("If an account with that email exists, a password reset link has been sent.")
                .success(true)
                .build();
    }
}
