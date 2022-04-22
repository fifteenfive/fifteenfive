package com.a307.fifteenfive.api.controller;


import com.a307.fifteenfive.api.responseDTO.MyInfoResponseDto;
import com.a307.fifteenfive.api.responseDTO.RefResponseDto;
import com.a307.fifteenfive.api.responseDTO.UserResponseDto;
import com.a307.fifteenfive.api.service.ReviewService;
import com.a307.fifteenfive.api.service.UserService;

import com.a307.fifteenfive.api.service.WishService;
import com.a307.fifteenfive.db.entity.Review;
import com.a307.fifteenfive.db.entity.User;
import com.a307.fifteenfive.db.entity.Wine;
import com.a307.fifteenfive.error.ErrorResponseBody;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;


@Slf4j
@Api(value = "auth API", tags = {"UserAuth"})
@RestController
@RequestMapping("/api/auth/users")
public class UserAuthController {

    @Autowired
    UserService userService;

    // 나의 정보 받기
    @GetMapping("/{id}/my-info")
    @ApiOperation(value = "나의 정보 조회", notes = "로그인한 유저가 토큰을 담아 요청을 보내서 유저 정보 중 일부를 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 403, message = "인증 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getMyInfo(
            @PathVariable final int id) {

        User user;
        try {
            user = userService.getUserByUserId(id);
            if (user == null) {
                return ResponseEntity.status(403).body(ErrorResponseBody.of(403, false, "잘못된 접근입니다."));
            }
        } catch (Exception exception) {
            return ResponseEntity.status(500).body(ErrorResponseBody.of(500, false, "Internal Server Error, 응답 실패"));
        }
        return ResponseEntity.status(200).body(MyInfoResponseDto.of(user));

    }

    // 유저 상세 정보 조회
    @GetMapping("/{id}")
    @ApiOperation(value = "유저 상세 조회", notes = "유저 아이디로 해당 유저 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "토큰이 유효하지 않음"),
            @ApiResponse(code = 404, message = "해당 유저정보 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> userDetail(
            @PathVariable final int user_id) {
        User user;
        try {
            user = userService.getUserByUserId(user_id);
            if (user == null) {
                return ResponseEntity.status(404).body(ErrorResponseBody.of(404, false, "해당 유저 정보가 존재하지 않습니다."));
            }
        } catch (Exception exception) {
            return ResponseEntity.status(500).body(ErrorResponseBody.of(500, false, "Internal Server Error, 유저 상세 정보 조회 실패"));
        }
        return ResponseEntity.status(200).body(UserResponseDto.of(user));
    }

    // 유저 정보 업데이트 (라이프스타일)
    @PutMapping(value = "/{id}")
    @ApiOperation(value = "유저 정보 업데이트", notes = "유저 정보(라이프스타일)를 업데이트한다.")
    public ResponseEntity<?> updateUserLifeStyle (@PathVariable("id") int user_id,
                                              @RequestParam(required = false) String userLifeStyleCode) {

        User old_user = userService.getUserByUserId(user_id);
        userService.updateUserLifestyle(userLifeStyleCode, old_user);

        return new ResponseEntity<>(HttpStatus.CREATED);
        }

    // 유저 정보 업데이트 (닉네임, 프로필이미지)
    @PutMapping(value = "/{id}/my-profile", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    @ApiOperation(value = "유저 정보 업데이트", notes = "유저 정보(닉네임, 프로필이미지)를 업데이트한다.")
    public ResponseEntity<?> updateUserDetail(@PathVariable("id") int user_id,
                                              @RequestParam(required = false) MultipartFile userProfileImg,
                                              @RequestParam(required = false) String userNickname) {

        User old_user = userService.getUserByUserId(user_id);
        userService.updateUserDetail(userProfileImg, userNickname, old_user);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}

