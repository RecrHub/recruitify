package com.recruitify.webapi.common.security;

import com.recruitify.webapi.common.token.service.ITokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNull;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * Stateless JWT auth filter that runs once per request.
 *
 * <p>For every incoming request:
 * <ol>
 *   <li>Read the {@code Authorization} header.</li>
 *   <li>Extract the bearer token (or short-circuit when absent).</li>
 *   <li>Delegate to {@link ITokenService#getAuthentication(String)}, which
 *       validates the signature/expiry and rebuilds the principal from the
 *       JWT claims (including the role and permission authorities).</li>
 *   <li>Populate the {@link SecurityContextHolder} so downstream
 *       {@code @PreAuthorize("hasAuthority(...)")} expressions see the
 *       authority set.</li>
 * </ol>
 *
 * <p>Invalid tokens are silently ignored — the request continues without
 * authentication and is rejected by the security chain rules if the route
 * requires auth.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final String HEADER_AUTHORIZATION = "Authorization";
    private static final String BEARER_PREFIX = "Bearer ";

    private final ITokenService tokenService;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {

        String token = resolveToken(request);
        if (StringUtils.hasText(token) && tokenService.validateToken(token)) {
            Authentication authentication = tokenService.getAuthentication(token);
            if (authentication != null) {
                SecurityContextHolder.getContext().setAuthentication(authentication);
                log.debug("Authenticated request for user '{}' with {} authorities",
                        authentication.getName(),
                        authentication.getAuthorities() == null ? 0 : authentication.getAuthorities().size());
            }
        }

        filterChain.doFilter(request, response);
    }

    private String resolveToken(HttpServletRequest request) {
        String header = request.getHeader(HEADER_AUTHORIZATION);
        if (StringUtils.hasText(header) && header.startsWith(BEARER_PREFIX)) {
            return header.substring(BEARER_PREFIX.length()).trim();
        }
        return null;
    }
}
