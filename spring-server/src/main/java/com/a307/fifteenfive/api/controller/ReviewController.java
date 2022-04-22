package com.a307.fifteenfive.api.controller;

import com.a307.fifteenfive.api.requestDTO.ReviewRequestDto;
import com.a307.fifteenfive.api.responseDTO.RefResponseDto;
import com.a307.fifteenfive.api.responseDTO.ReviewResponseDto;
import com.a307.fifteenfive.api.responseDTO.WineResponseDto;
import com.a307.fifteenfive.api.service.ReviewLikeService;
import com.a307.fifteenfive.api.service.ReviewService;
import com.a307.fifteenfive.api.service.UserService;
import com.a307.fifteenfive.api.service.WineService;
import com.a307.fifteenfive.db.entity.Review;
import com.a307.fifteenfive.db.entity.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Api(value = "(특정 와인의) 리뷰 API", tags = {"Review"})
@RestController
@RequestMapping("/api/wines/{wine_id}/reviews")
public class ReviewController {

    private final ReviewService reviewService;
    private final UserService userService;
    private final WineService wineService;
    private final ReviewLikeService reviewLikeService;


    @Autowired
    public ReviewController(ReviewService reviewService, UserService userService, WineService wineService, ReviewLikeService reviewLikeService) {
        this.reviewService = reviewService;
        this.userService = userService;
        this.wineService = wineService;
        this.reviewLikeService = reviewLikeService;
    }

    // 해당 와인의 리뷰 작성
    @PostMapping(value = "", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE}) // API 타입지정 필수
    @ApiOperation(value = "와인 리뷰 작성", notes = "특정 와인에 대한 리뷰를 작성한다")
    public ResponseEntity<?> createReview (@AuthenticationPrincipal String token, @RequestParam(required = false) MultipartFile reviewImg, @PathVariable("wine_id") Integer wine_id, ReviewRequestDto reviewRequestDto) throws IOException {

        log.info("reviewContent:{}", reviewRequestDto.getContent());
        log.info("userEmailasToken:{}", token);
        log.info("reviewImg:{}", reviewImg);

        User user;
        Review review;

        user = userService.getUserByUserEmail(token);
        review = reviewService.postReview(reviewRequestDto, (MultipartFile) reviewImg, user, wine_id);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    // 해당 와인의 리뷰 수정
    @PutMapping(value = "/{review_id}", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE}) // API 타입지정 필수
    @ApiOperation(value = "와인 리뷰 수정", notes = "특정 와인에 대한 리뷰를 수정한다")
    public ResponseEntity<?> updateReview (@AuthenticationPrincipal String token, @RequestParam(required = false) MultipartFile reviewImg, @PathVariable("wine_id") Integer wine_id, @PathVariable("review_id") Integer review_id, ReviewRequestDto reviewRequestDto) throws IOException {

        log.info("reviewContent:{}", reviewRequestDto.getContent());
        log.info("userEmailasToken:{}", token);
        log.info("reviewImg:{}", reviewImg);

        User user;
        user = userService.getUserByUserEmail(token);

        // 해당 아이디의 리뷰를 찾는다.
        Review old_review = reviewService.getReviewByReviewId(review_id);


        // 새로 받은 정보 + 찾은 리뷰를 넘긴다.
        reviewService.updateReview(reviewRequestDto, (MultipartFile) reviewImg, user, wine_id, old_review);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    // 해당 와인의 리뷰 삭제
    @DeleteMapping("/{review_id}")
    @ApiOperation(value = "와인 리뷰 삭제", notes = "특정 와인에 대한 리뷰를 삭제한다")
    public ResponseEntity<?> deleteReview (@PathVariable("review_id") Integer reviewId) throws IOException {

        Review review;
        review = reviewService.deleteReview(reviewId);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }


    // 해당 와인의 모든 리뷰 반환
    @GetMapping()
    @ApiOperation(value = "와인 리뷰 반환", notes = "특정 와인에 대한 모든 리뷰를 반환한다")
    public ResponseEntity<?> getReviewList(@PathVariable("wine_id") Integer wine_id) {

        Map<Integer, List<ReviewResponseDto>> resultList = reviewService.findAllReviewsByWineId(wine_id);

        return new ResponseEntity<>(resultList, HttpStatus.OK);
    }

    // 리뷰를 남긴 유저가 해당 와인에 남긴 모든 리뷰 반환(최근날짜순)
    @GetMapping("/{reiew_id}")
    @ApiOperation(value = "리뷰를 남긴 유저가 해당 와인에 남긴 모든 리뷰 반환(최근날짜순)", notes = "리뷰를 남긴 유저의 해당 와인에 대한 모든 리뷰를 반환한다")
    public ResponseEntity<?> getUserReviewList(@PathVariable("wine_id") Integer wine_id, @RequestParam("user_id") Integer user_id) {

        HashMap<String, Object> resultList = new HashMap<>();

        WineResponseDto wineResponseDto = wineService.getWineByWineId(wine_id);
        List<ReviewResponseDto> reviewResponseDtos = reviewService.findAllReviewsByUserIdAndWineId(user_id, wine_id);

        resultList.put("wine_name_kor", wineResponseDto.getKorName());
        resultList.put("wine_name_eng", wineResponseDto.getEngName());
        resultList.put("reviews", reviewResponseDtos);

        return new ResponseEntity<>(resultList, HttpStatus.OK);
    }

}
