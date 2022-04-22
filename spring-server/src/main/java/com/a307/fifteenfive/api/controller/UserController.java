package com.a307.fifteenfive.api.controller;

import com.a307.fifteenfive.api.requestDTO.DeleteUserRequestDto;
import com.a307.fifteenfive.db.entity.User;
import com.a307.fifteenfive.error.exception.ErrorCode;
import com.a307.fifteenfive.error.exception.custom.EmailDuplicatedException;
import io.swagger.annotations.*;
import com.a307.fifteenfive.api.requestDTO.UserRequestDto;
import com.a307.fifteenfive.api.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@Api(value = "유저 API", tags = {"User"})
@RestController
@Slf4j
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;

    }

    // 회원가입
    @PostMapping("/sign-up")
    public ResponseEntity signup(@Valid @RequestBody UserRequestDto signUpReq) {

        userService.signup(signUpReq);

        return new ResponseEntity(HttpStatus.OK);
    }

    // 이메일 중복 체크
    @GetMapping("/check_email/{userEmail}")
    @ApiOperation(value = "이메일 중복 확인", notes = "<strong>queryString에 email로</strong> 이메일 중복을 체크한다.")
    public ResponseEntity checkDuplicatedEmail (@PathVariable("userEmail") String userEmail) {
        User user = userService.getUserByUserEmail(userEmail);
        System.out.println(user);
        if(user != null) {
            log.info("이메일 중복");
            throw new EmailDuplicatedException(ErrorCode.EMAIL_DUPLICATION);
        }
        return new ResponseEntity(HttpStatus.OK);
    }

    // 회원 탈퇴
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String,String>> deleteUser(@RequestBody DeleteUserRequestDto deleteUserReq, @PathVariable("id") String id){
        HashMap<String, String> map = new HashMap<String, String>();

        if (userService.deleteUser(deleteUserReq, Integer.parseInt(id))) {
            map.put("message", "삭제 성공");
            return new ResponseEntity<Map<String,String>>(map, HttpStatus.OK);
        } else {
            map.put("message", "잘못된 password");
            return new ResponseEntity<Map<String, String>>(map, HttpStatus.BAD_REQUEST);
        }
    }

}
