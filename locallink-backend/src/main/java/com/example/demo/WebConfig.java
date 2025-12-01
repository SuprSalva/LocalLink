package com.example.demo; 

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Permite todas las URLs
                        .allowedOrigins("http://localhost:4200") // Permite Angular
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Permite todo
                        .allowedHeaders("*");
            }
        };
    }
}