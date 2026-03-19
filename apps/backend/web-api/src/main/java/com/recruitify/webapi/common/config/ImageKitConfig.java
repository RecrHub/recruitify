package com.recruitify.webapi.common.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.context.annotation.Bean;

import io.imagekit.sdk.ImageKit;
import io.imagekit.sdk.config.Configuration;

@SpringBootConfiguration
public class ImageKitConfig {
    private final ImageKit imageKit;

    @Value("${imagekit.public-key}")
    private String public_key;

    @Value("{${imagekit.private-key}}")
    private String private_key;

    @Value("{${imagekit.url-endpoint}}")
    private String url_endpoint;
    ImageKitConfig(ImageKit imageKit) {
        this.imageKit = imageKit;
    }
    @Bean
    ImageKit imageKit ()
    {
        Configuration config = new Configuration(public_key, private_key, url_endpoint);
        imageKit.setConfig(config);
        return imageKit;
    }
}
