package com.recruitify.webapi.common.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

/**
 * Wiring layer for the local / first-run seeders.
 *
 * <p>The actual seeding logic lives in dedicated {@code @Service} classes
 * ({@link RbacCatalogSeeder}, {@link DemoDataSeeder}) so that
 * {@code @Transactional} on their {@code seed()} methods is honoured by the
 * Spring proxy. This config just exposes them as Spring Boot
 * {@link CommandLineRunner} beans in the right order.
 *
 * <p>Order matters: {@link RbacCatalogSeeder} must run before
 * {@link DemoDataSeeder} so demo users can resolve their roles.
 *
 * <p>Both beans must share the same {@code @Profile} as the services they
 * inject — otherwise Spring fails to start because the dependency would not
 * be registered on the active profile.
 */
@Configuration
public class LocalDataSeeder {

    @Bean
    CommandLineRunner seedRbacCatalogRunner(RbacCatalogSeeder seeder) {
        return args -> seeder.seed();
    }

    @Bean
    @Profile({"local", "test"})
    CommandLineRunner seedDemoDataRunner(DemoDataSeeder seeder) {
        return args -> seeder.seed();
    }
}
