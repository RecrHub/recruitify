package com.recruitify.loginscreen;

import com.recruitify.common.config.JwtConfig;
import com.recruitify.common.exception.GlobalExceptionHandler;
import com.recruitify.common.token.controller.TokenController;
import com.recruitify.common.token.service.RefreshTokenService;
import com.recruitify.common.token.service.TokenService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = "com.recruitify.common.model")
@EnableJpaRepositories(basePackages = {
        "com.recruitify.loginscreen.repository",
        "com.recruitify.common.token.repository"
})
@EnableConfigurationProperties(JwtConfig.class)
@Import({GlobalExceptionHandler.class, TokenController.class, TokenService.class, RefreshTokenService.class})
public class LoginScreenApplication {

    public static void main(String[] args) {
        SpringApplication.run(LoginScreenApplication.class, args);
    }
}
