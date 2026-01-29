package com.recruitify.signupscreen;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = "com.recruitify.common.model")
@EnableJpaRepositories(basePackages = {
        "com.recruitify.signupscreen.repository",
        "com.recruitify.common.token.repository"
})
public class SignupScreenApplication {

    public static void main(String[] args) {
        SpringApplication.run(SignupScreenApplication.class, args);
    }
}
