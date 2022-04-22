package com.a307.fifteenfive;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.filter.CharacterEncodingFilter;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.nio.charset.StandardCharsets;

@EnableSwagger2
@SpringBootApplication
public class FifteenFiveApplication {

	public static void main(String[] args) {
		SpringApplication.run(FifteenFiveApplication.class, args);
	}

}
