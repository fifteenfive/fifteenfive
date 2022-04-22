package com.a307.fifteenfive.api.requestDTO;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.validation.constraints.NotNull;


@Getter
@Setter
@ApiModel("LoginRequest")
public class LoginRequestDto {

    @ApiModelProperty(name = "유저 email", example = "llunaB@gmail.com")
    @NotNull(message = "email may not be empty")
    private String userEmail;

    @ApiModelProperty(name = "유저 password", example = "ssafy307")
    @NotNull(message = "password may not be empty")
    private String userPassword;
}