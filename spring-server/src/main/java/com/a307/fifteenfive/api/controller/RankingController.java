package com.a307.fifteenfive.api.controller;

import com.a307.fifteenfive.api.service.RankingService;
import com.a307.fifteenfive.db.entity.BestTenRed;
import com.a307.fifteenfive.db.entity.BestTenWhite;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;

@Api(value = "랭킹 API", tags = {"Rank"})
@RestController
@RequestMapping("/api/rank")
public class RankingController {

    private RankingService rankingService;

    @Autowired
    public RankingController(RankingService rankingService) {
        this.rankingService = rankingService;
    }


    @GetMapping("/red")
    @ApiOperation(value = "레드 와인 랭킹", notes = "레드 추천 와인 리스트 반환")
    public ResponseEntity<HashMap<String, Object>> getRankRed() {

        HashMap<String, Object> resultList = new HashMap<>();

        String wineType1 = "레드";

        List<BestTenRed> rankRed = rankingService.getRankRed();

        resultList.put(wineType1, rankRed);

        return new ResponseEntity<>(resultList, HttpStatus.OK);
    }

    @GetMapping("/white")
    @ApiOperation(value = "화이트 와인 랭킹", notes = "화이트 추천 와인 리스트 반환")
    public ResponseEntity<HashMap<String, Object>> getRankWhite() {

        HashMap<String, Object> resultList = new HashMap<>();

        String wineType2 = "화이트";

        List<BestTenWhite> rankWhite = rankingService.getRankWhite();

        resultList.put(wineType2, rankWhite);

        return new ResponseEntity<>(resultList, HttpStatus.OK);
    }
}
