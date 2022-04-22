package com.a307.fifteenfive.api.controller;

import com.a307.fifteenfive.api.requestDTO.LoginRequestDto;
import com.a307.fifteenfive.api.responseDTO.LoginResponseDto;
import com.a307.fifteenfive.api.service.UserService;
import com.a307.fifteenfive.config.jwt.TokenProvider;
import com.a307.fifteenfive.db.entity.User;
import com.a307.fifteenfive.error.ErrorResponseBody;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "로그인 API", tags = {"sign-in"})
@RestController
@RequestMapping("/api/users/sign-in")
public class LoginController {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private UserService userService;

    // 로그인 시 토큰 생성
    @PostMapping("")
    @ApiOperation(value = "로그인", notes = "이메일과 비밀번호를 받아서 확인한 뒤 토큰 생성")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = LoginResponseDto.class),
            @ApiResponse(code = 401, message = "인증 실패", response = ErrorResponseBody.class, responseContainer = "List"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> userCheckAndSendToken(
            @RequestBody LoginRequestDto loginRequestDto) {

        User user;
        try {
            user = userService.getUserByUserEmail(loginRequestDto.getUserEmail());
        } catch (Exception exception) {
            return ResponseEntity.status(500).body(ErrorResponseBody.of(500, false, "Internal Server Error, 로그인 실패"));
        }
        if (user == null) {
            return ResponseEntity.status(401).body(ErrorResponseBody.of(401, false, "아이디 또는 비밀번호가 잘못 입력되었습니다."));
        }
        if (!passwordEncoder.matches(loginRequestDto.getUserPassword(), user.getUserPassword())) {
            return ResponseEntity.status(401).body(ErrorResponseBody.of(401, false, "아이디 또는 비밀번호가 잘못 입력되었습니다."));
        }
        String token = tokenProvider.createToken(loginRequestDto.getUserEmail());
        return ResponseEntity.status(200).body(LoginResponseDto.of("로그인 하였습니다.", user, token));
    }

}
