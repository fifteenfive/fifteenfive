package com.a307.fifteenfive.api.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Api(value = "Connect Django API", tags = {"Conn_Django"})
@RestController
@RequestMapping("/api/connDjango")
public class ConnectDjangoController {

    @GetMapping(value = "/usercf/{user_id}")
    @ApiOperation(value = "유저기반 데이터 저장", notes = "유저 ID를 받아 유저기반 알고리즘을 구하여 테이블에 저장")
    public void userBasedCF(@PathVariable("user_id") int user_id, HttpServletResponse httpServletResponse) throws IOException {

        httpServletResponse.sendRedirect("https://j6a307.p.ssafy.io/data/usercf/"+user_id);

    }
}
