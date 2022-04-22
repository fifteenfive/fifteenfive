package com.a307.fifteenfive.config;

import com.a307.fifteenfive.config.jwt.JwtFilter;
import com.a307.fifteenfive.config.jwt.TokenProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;


@Configuration
@EnableWebSecurity(debug = true) // 이하 스프링 시큐리티 필터가 스프링 필터체인에 등록된다.
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final TokenProvider tokenProvider;

    public SecurityConfig(TokenProvider tokenProvider) {

        this.tokenProvider = tokenProvider;

    }

    // 패스워드 암호화 - 해당 메서드의 리턴되는 IOC를 빈으로 등록한다.
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // authenticationManager를 Bean 등록함.
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {

        return super.authenticationManagerBean();

    }
    
    // 이하 경로는 필터를 동작시키지 않는다.
    public void configure(WebSecurity web) {
        web.ignoring()
                .antMatchers(
                        "/h2-console/**",
                        "/favicon.ico",
                        "/error",
                        "/swagger-resources/**",
                        "/swagger-ui/**",
                        "/v2/api-docs",
                        "/webjars/**"
                );
    }

    // 필터 세팅
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.cors(withDefaults()); // 글로벌 cors 처리
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS); // 세션을 사용하지 않기 때문에 STATELESS로 설정
        http.formLogin().disable(); // form 태그 로그인을 하지 않는다.

        http
                // 매 요청마다 header에 authorization에 ID, PS 넣어다닌다. (basic방식) https를 쓰면 이 정보가 암호화가 된다.
                // 우리는 authrization에 token을 넣는다. 이것이 Bearer 방식이다. 유효시간이 있어서 토큰 노출되어도 큰 위험은 없다.
                .httpBasic().disable()

                // 이하 url에 해당 필터를 동작시킨다.
                .authorizeRequests()
                .antMatchers("/api/auth/**").access("hasRole('USER')")
                .antMatchers("/api/auth/users/{id}/my-info").authenticated()
                .anyRequest().permitAll()
                .and()
                .addFilterBefore(new JwtFilter(tokenProvider), UsernamePasswordAuthenticationFilter.class); ;
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        //configuration.setAllowCredentials(true); // 내 서버가 응답할 때 json을 자바스크립트에서 처리할 수 있다.
        //아랫줄과 같이 못씀
        configuration.setAllowedOrigins(Arrays.asList("*")); // 모든 ip에 응답을 허용하겠다.
        configuration.setAllowedHeaders(Arrays.asList("*")); // 모든 header에 응답을 허용하겠다.
        configuration.setAllowedMethods(Arrays.asList("*")); // 모든 post, get .. 요청을 허용하겠다.

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", configuration);
        return source;
    }
}
