package com.a307.fifteenfive.config;

import lombok.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.util.UriComponentsBuilder;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.paths.DefaultPathProvider;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger.web.UiConfiguration;
import springfox.documentation.swagger.web.UiConfigurationBuilder;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.Arrays;
import java.util.List;

import static springfox.documentation.builders.PathSelectors.regex;
import static springfox.documentation.spring.web.paths.Paths.removeAdjacentForwardSlashes;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

    @Bean
    public Docket api() {

        return new Docket(DocumentationType.SWAGGER_2).useDefaultResponseMessages(false)
                .apiInfo(metadata())
                .securityContexts(Arrays.asList(securityContext())) // 인증방식
                .securitySchemes(Arrays.asList(apiKey())) // 버튼 클릭시 입력값
                .select()
                .apis(RequestHandlerSelectors.any())
//                .paths(PathSelectors.any())
                .paths(PathSelectors.ant("/api/**")) // 아래와 동일
//                .paths(regex("/api/.*")) // 컨트롤러 기본 URI인 api부터 시작하도록 설정
                .build();
    }

    // REST API의 기본 정보
    private ApiInfo metadata() {
        return new ApiInfoBuilder()
                .title("[A307] REST API")
                .version("1.0")
                .description("[A307] BackEnd REST API Details")
                .build();
    }

    // auth 사용하겠다
    private SecurityContext securityContext() {
        return SecurityContext.builder()
                .securityReferences(defaultAuth())
                .build();
    }


    // jwt authorization 1/2 // key앞에 Bearer 넣어주어야함!
    private ApiKey apiKey() {
        return new ApiKey("JWT", "Authorization", "header");
    }

    // jwt authorization 2/2
    private List<SecurityReference> defaultAuth() {
        AuthorizationScope authorizationScope = new AuthorizationScope("global", "accessEverything");
        AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
        authorizationScopes[0] = authorizationScope;
        return Arrays.asList(new SecurityReference("JWT", authorizationScopes));
    }

    @Bean
    UiConfiguration uiConfig() {
        return UiConfigurationBuilder.builder()
                .build();
    }


}
