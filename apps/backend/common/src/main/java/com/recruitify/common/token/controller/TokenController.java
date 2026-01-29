package com.recruitify.common.token.controller;

import com.recruitify.common.event.AuthenticationEvent;
import com.recruitify.common.exception.TokenRefreshException;
import com.recruitify.common.model.identity.RefreshToken;
import com.recruitify.common.model.identity.User;
import com.recruitify.common.security.UserDetailsImpl;
import com.recruitify.common.token.dto.RefreshTokenRequest;
import com.recruitify.common.token.dto.TokenResponseVO;
import com.recruitify.common.token.service.IRefreshTokenService;
import com.recruitify.common.token.service.ITokenService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/token")
@Tag(name = "Token", description = "Token management APIs")
@RequiredArgsConstructor
public class TokenController {

    private final IRefreshTokenService refreshTokenService;
    private final ITokenService tokenService;
    private final ApplicationEventPublisher eventPublisher;

    @PostMapping("/refresh")
    @Operation(
            summary = "Refresh access token",
            description = "Get new access token using refresh token",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Token refreshed successfully",
                            content = @Content(schema = @Schema(implementation = TokenResponseVO.class))),
                    @ApiResponse(responseCode = "403", description = "Invalid or expired refresh token")
            }
    )
    public ResponseEntity<TokenResponseVO> refreshToken(
            @Valid @RequestBody RefreshTokenRequest request,
            HttpServletRequest httpRequest) {
        try {
            String requestRefreshToken = request.getRefreshToken();

            TokenResponseVO response = refreshTokenService.findByToken(requestRefreshToken)
                    .map(refreshTokenService::verifyExpiration)
                    .map(refreshToken -> {
                        User user = refreshToken.getUser();
                        UserDetailsImpl userDetails = UserDetailsImpl.build(user);

                        String accessToken = tokenService.generateAccessToken(userDetails);

                        RefreshToken newRefreshToken;
                        try {
                            newRefreshToken = refreshTokenService.createRefreshToken(user);
                        } catch (DataIntegrityViolationException ex) {
                            List<RefreshToken> activeTokens = refreshTokenService.findActiveTokensByUser(user);
                            if (activeTokens.isEmpty()) {
                                throw new TokenRefreshException(requestRefreshToken,
                                        "Could not create new refresh token due to constraint violation");
                            }
                            newRefreshToken = activeTokens.get(0);
                        }

                        refreshTokenService.useToken(refreshToken, newRefreshToken.getToken());

                        String role = user.getRole().getName();

                        return TokenResponseVO.builder()
                                .accessToken(accessToken)
                                .refreshToken(newRefreshToken.getToken())
                                .id(user.getId())
                                .email(user.getEmail())
                                .role(role)
                                .build();
                    })
                    .orElseThrow(() -> new TokenRefreshException(requestRefreshToken,
                            "Refresh token not found in database"));

            eventPublisher.publishEvent(new AuthenticationEvent(
                    this,
                    response.getEmail(),
                    AuthenticationEvent.AuthEventType.REFRESH_TOKEN,
                    "Token refreshed",
                    getClientIp(httpRequest)
            ));

            return ResponseEntity.ok(response);
        } catch (TokenRefreshException e) {
            eventPublisher.publishEvent(new AuthenticationEvent(
                    this,
                    "unknown",
                    AuthenticationEvent.AuthEventType.INVALID_TOKEN,
                    e.getMessage(),
                    getClientIp(httpRequest)
            ));
            throw e;
        }
    }

    private String getClientIp(HttpServletRequest request) {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader == null) {
            return request.getRemoteAddr();
        }
        return xfHeader.split(",")[0];
    }
}
