package com.a307.fifteenfive.api.responseDTO;

import com.a307.fifteenfive.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@ApiModel("LoginRes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponseDto {

    @ApiModelProperty(name = "access-token") // jwt 토큰 반환
    private String token;

    @ApiModelProperty(name = "message", example = "로그인 하였습니다.")
    private String message;

    @ApiModelProperty(name = "user_id")
    private Integer userId;

    @ApiModelProperty(name = "user_email")
    private String userEmail;

    @ApiModelProperty(name = "user_nickname")
    private String userNickName;

    @ApiModelProperty(name = "user_profile_url")
    private String userProfileUrl;

    @ApiModelProperty(name = "user_lifestyle_code")
    private String userLifestyleCode;

    public static LoginResponseDto of(String message, User user, String token) {
        LoginResponseDto body = new LoginResponseDto();
        body.setMessage(message);
        body.setUserId(user.getUserId());
        body.setUserEmail(user.getUserEmail());
        body.setUserNickName(user.getUserNickname());
        body.setUserLifestyleCode(user.getUserLifestyleCode());
        body.setUserProfileUrl(user.getUserProfileUrl());
        body.setToken(token);
        return body;
    }

}
