package com.recruitify.webapi.common.token.service;

import com.recruitify.webapi.common.config.JwtConfig;
import com.recruitify.webapi.common.security.UserDetailsImpl;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class TokenService implements ITokenService {
    private final JwtConfig jwtConfig;

    /** Authority claim name — stores both role (ROLE_X) and permission authorities. */
    static final String CLAIM_AUTHORITIES = "authorities";
    /** User id claim — used by the auth filter to rehydrate UserDetailsImpl. */
    static final String CLAIM_USER_ID = "uid";

    @Override
    public String generateAccessToken(UserDetails userDetails) {
        return generateToken(userDetails, jwtConfig.getExpirationMs());
    }

    @Override
    public String generateRefreshToken(UserDetails userDetails) {
        return generateToken(userDetails, jwtConfig.getRefreshExpirationMs());
    }

    private String generateToken(UserDetails userDetails, long expirationMs) {
        Map<String, Object> claims = new HashMap<>();

        // Persist authorities verbatim so @PreAuthorize("hasAuthority(...)")
        // checks work without an extra DB lookup. userDetails.getAuthorities()
        // already includes both ROLE_<role> and <permission> entries.
        Collection<String> authorityNames = userDetails.getAuthorities() == null
                ? Collections.emptyList()
                : userDetails.getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority)
                        .toList();
        claims.put(CLAIM_AUTHORITIES, authorityNames);

        if (userDetails instanceof UserDetailsImpl ud) {
            claims.put(CLAIM_USER_ID, ud.getId());
        }

        return Jwts.builder()
                .claims(claims)
                .subject(userDetails.getUsername())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(getSigningKey())
                .compact();
    }

    @Override
    public String getUsernameFromToken(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    @Override
    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (SignatureException e) {
            log.error("Invalid JWT signature: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            log.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            log.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            log.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            log.error("JWT claims string is empty: {}", e.getMessage());
        }
        return false;
    }

    @Override
    public Authentication getAuthentication(String token) {
        if (token == null) {
            return null;
        }

        try {
            Claims claims = Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();

            String username = claims.getSubject();

            Collection<String> rawAuthorities = readAuthorities(claims);
            Collection<SimpleGrantedAuthority> granted = rawAuthorities.stream()
                    .filter(Objects::nonNull)
                    .map(String::trim)
                    .filter(s -> !s.isEmpty())
                    .map(SimpleGrantedAuthority::new)
                    .collect(Collectors.toList());

            Long userId = readUserId(claims);
            UserDetailsImpl principal = UserDetailsImpl.fromClaims(
                    userId == null ? 0L : userId,
                    username,
                    granted.stream().map(SimpleGrantedAuthority::getAuthority).toList());

            return new UsernamePasswordAuthenticationToken(principal, token, granted);
        } catch (Exception e) {
            log.error("Authentication error: {}", e.getMessage());
            return null;
        }
    }

    @SuppressWarnings("unchecked")
    private Collection<String> readAuthorities(Claims claims) {
        // Preferred: a flat list of authority strings written by generateToken.
        Object authoritiesClaim = claims.get(CLAIM_AUTHORITIES);
        if (authoritiesClaim instanceof Collection<?> coll) {
            List<String> result = new ArrayList<>(coll.size());
            for (Object item : coll) {
                if (item != null) result.add(item.toString());
            }
            return result;
        }

        // Backward compatibility: tokens issued before this change stored
        // authorities as List<Map<String,String>> with key "authority".
        Object legacy = claims.get("roles");
        if (legacy instanceof Collection<?> coll) {
            List<String> result = new ArrayList<>(coll.size());
            for (Object item : coll) {
                if (item instanceof Map<?, ?> map) {
                    Object authority = map.get("authority");
                    if (authority != null) result.add(authority.toString());
                } else if (item != null) {
                    result.add(item.toString());
                }
            }
            return result;
        }
        return Collections.emptyList();
    }

    private Long readUserId(Claims claims) {
        Object uid = claims.get(CLAIM_USER_ID);
        if (uid instanceof Number n) return n.longValue();
        if (uid instanceof String s) {
            try {
                return Long.parseLong(s);
            } catch (NumberFormatException ignored) {
                return null;
            }
        }
        return null;
    }

    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(jwtConfig.getSecret());
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
