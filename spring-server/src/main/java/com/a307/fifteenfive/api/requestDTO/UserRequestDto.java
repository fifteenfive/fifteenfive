package com.a307.fifteenfive.api.requestDTO;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserRequestDto {
    @ApiModelProperty(value = "유저 email")
    private String userEmail;

    @ApiModelProperty(value = "유저 password")
    private String userPassword;

    @ApiModelProperty(value = "유저 nickvalue")
    private String userNickname;

    @ApiModelProperty(value = "유저 profile url")
    private String userProfileUrl;

    @ApiModelProperty(value = "유저 lifestyle code")
    private String userLifestyleCode;
}



