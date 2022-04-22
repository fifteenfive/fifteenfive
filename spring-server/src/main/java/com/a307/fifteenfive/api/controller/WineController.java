package com.a307.fifteenfive.api.controller;

import com.a307.fifteenfive.api.responseDTO.WineResponseDto;
import com.a307.fifteenfive.api.service.WineService;
import com.a307.fifteenfive.db.entity.Wine;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;


@Slf4j
@Api(value = "와인 API", tags = {"Wine"})
@RestController
@RequestMapping("/api/wines")
public class WineController {
    private final WineService wineService;

    @Autowired
    public WineController(WineService wineService) {
        this.wineService = wineService;
    }

    // 와인 상세정보 반환
    @GetMapping("/{wine_id}")
    @ApiOperation(value = "와인 상세정보 반환", notes = "특정 와인에 대한 상세 정보를 반환한다")
    public ResponseEntity<HashMap<String, Object>> getWineDetail(@PathVariable("wine_id") int wine_id) {

        HashMap<String, Object> resultList = new HashMap<>();

        WineResponseDto wineResponseDto = wineService.getWineByWineId(wine_id);
        resultList.put("result", wineResponseDto);

        return new ResponseEntity<>(resultList, HttpStatus.OK);
    }

    // 와인 검색
    @GetMapping("/search/{word}")
    @ApiOperation(value = "와인 검색", notes = "와인을 검색한다")
    public ResponseEntity<HashMap<String, Object>> getWinelist(@PathVariable("word") String word) {
        HashMap<String, Object> resultList = new HashMap<>();
        List<Wine> winelist = wineService.getWinelist(word);

        log.info("word:{}", word);
        resultList.put("result", winelist);
        log.info("결과리스트{}", winelist);

        return new ResponseEntity<>(resultList, HttpStatus.OK);
    }
}

