package com.recruitify.webapi.common.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.recruitify.webapi.common.security.JwtAuthenticationFilter;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.http.HttpMethod;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    @Value("${cors.allowed-origins:http://localhost:3000}")
    private String allowedOrigins;

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // Wire our JSON 403 handler so that filter-chain-level denials
                // (e.g. .anyRequest().authenticated() without a JWT) do not
                // bubble up to the @ControllerAdvice as a generic Exception and
                // get mis-reported as 500.
                .exceptionHandling(ex -> ex.accessDeniedHandler(jsonAccessDeniedHandler()))
                // JWT filter must run before the username/password auth filter so
                // that the SecurityContext is populated with role + permission
                // authorities for @PreAuthorize("hasAuthority(...)") checks.
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                        org.springframework.security.web.util.matcher.AntPathRequestMatcher.antMatcher(HttpMethod.GET, "/api/v1/jobs"),
                        org.springframework.security.web.util.matcher.AntPathRequestMatcher.antMatcher(HttpMethod.GET, "/api/v1/jobs/**"),
                                AntPathRequestMatcher.antMatcher("/api/v1/auth/**"),
                                AntPathRequestMatcher.antMatcher("/api/v1/admin/auth/**"),
                                AntPathRequestMatcher.antMatcher("/api/v1/hr/auth/**"),
                                AntPathRequestMatcher.antMatcher("/api/v1/homepage/**"),
                                AntPathRequestMatcher.antMatcher("/api/v1/find-job/**"),
                                AntPathRequestMatcher.antMatcher("/api/v1/companies/**"),
                                AntPathRequestMatcher.antMatcher("/api/v1/companies**"),
                                AntPathRequestMatcher.antMatcher("/swagger-ui/**"),
                                AntPathRequestMatcher.antMatcher("/swagger-ui.html"),
                                AntPathRequestMatcher.antMatcher("/api-docs/**"),
                                AntPathRequestMatcher.antMatcher("/v3/api-docs/**"),
                                AntPathRequestMatcher.antMatcher("/error"))
                        .permitAll()
                        .anyRequest().authenticated());
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(List.of("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    /**
     * Returns a JSON 403 body that matches the project's {@code ApiErrorResponse}
     * shape used by {@code GlobalExceptionHandler}, so clients see a consistent
     * error envelope regardless of whether the denial came from the filter
     * chain or from a {@code @PreAuthorize} check.
     */
    @Bean
    public AccessDeniedHandler jsonAccessDeniedHandler() {
        ObjectMapper mapper = new ObjectMapper();
        return (request, response, accessDeniedException) -> {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.setCharacterEncoding("UTF-8");

            Map<String, Object> body = new LinkedHashMap<>();
            body.put("timestamp", LocalDateTime.now().toString());
            body.put("status", HttpServletResponse.SC_FORBIDDEN);
            body.put("error", "Forbidden");
            body.put("message", "Access denied");
            body.put("fields", null);

            mapper.writeValue(response.getOutputStream(), body);
        };
    }
}
