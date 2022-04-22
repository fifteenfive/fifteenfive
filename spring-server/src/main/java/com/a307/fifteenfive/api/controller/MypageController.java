package com.a307.fifteenfive.api.controller;

import com.a307.fifteenfive.api.responseDTO.RefResponseDto;
import com.a307.fifteenfive.api.service.ReviewService;
import com.a307.fifteenfive.api.service.WishService;
import com.a307.fifteenfive.db.entity.Review;
import com.a307.fifteenfive.db.entity.Wine;
import com.a307.fifteenfive.db.entity.Wish;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@Api(value = "마이페이지 API", tags = {"Mypage"})
@RestController
@RequestMapping("/api/mypage")
public class MypageController {

    private static final String SUCCESS = "200";
    private static final String FAIL = "500";

    @Autowired
    WishService wishService;

    @Autowired
    ReviewService reviewService;

    // 나의 위시리스트
    @GetMapping("/{user_id}/wishes")
    @ApiOperation(value = "나의 위시리스트", notes = "위시리스트 목록을 불러온다.")
    public ResponseEntity<HashMap<String, Object>> getWinelist(@PathVariable("user_id") int userId) {
        HashMap<String, Object> resultList = new HashMap<>();
        List<Wine> winelist = wishService.myWishlist(userId);

        resultList.put("result", winelist);

        return new ResponseEntity<>(resultList, HttpStatus.OK);
    }

    // 나의 리뷰
    @GetMapping("/{user_id}/reviews")
    @ApiOperation(value = "나의 리뷰", notes = "리뷰 목록을 불러온다.")
    public ResponseEntity<HashMap<String, Object>> getReviewlist(@PathVariable("user_id") int userId) {
        HashMap<String, Object> resultList = new HashMap<>();
        List<Review> reviewList = reviewService.myReviewList(userId);

        resultList.put("result", reviewList);

        return new ResponseEntity<>(resultList, HttpStatus.OK);
    }

    // 나의 냉장고
    @GetMapping("/{user_id}/celler")
    @ApiOperation(value = "나의 냉장고", notes = "냉장고 목록을 불러온다.")
    public ResponseEntity<HashMap<String, Object>> getReflist(@PathVariable("user_id") int userId) {
        HashMap<String, Object> resultList = new HashMap<>();
        List<RefResponseDto> winelist = reviewService.myReflist(userId);

        resultList.put("result", winelist);

        return new ResponseEntity<>(resultList, HttpStatus.OK);
    }
}
