package com.a307.fifteenfive.api.responseDTO;


import com.a307.fifteenfive.db.entity.User;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MyInfoResponseDto {

    @ApiModelProperty(name="user_id")
    private Integer userId;

    @ApiModelProperty(name = "user_email")
    private String userEmail;

    @ApiModelProperty(name = "user_nickname")
    private String userNickname;

    @ApiModelProperty(name = "user_profile_url")
    private String userProfileUrl;

    @ApiModelProperty(name = "user_lifestyle_code")
    private String userLifestyleCode;


    public static MyInfoResponseDto of(User user) {

        MyInfoResponseDto body = new MyInfoResponseDto();
        body.setUserId(user.getUserId());
        body.setUserEmail(user.getUserEmail());
        body.setUserNickname(user.getUserNickname());
        body.setUserProfileUrl(user.getUserProfileUrl());
        body.setUserLifestyleCode(user.getUserLifestyleCode());
        return body;

    }

}
