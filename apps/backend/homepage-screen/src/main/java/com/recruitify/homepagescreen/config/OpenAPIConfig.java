package com.recruitify.homepagescreen.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenAPIConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Homepage Screen API")
                        .version("1.0.0")
                        .description("API for Homepage Screen Service - provides aggregated data for the homepage")
                        .contact(new Contact()
                                .name("Recruitify Team")
                                .email("support@recruitify.com")))
                .servers(List.of(
                        new Server().url("http://localhost:8086").description("Local Development Server")
                ));
    }
}
