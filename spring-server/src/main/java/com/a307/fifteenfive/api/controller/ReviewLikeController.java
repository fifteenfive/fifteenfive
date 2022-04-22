package com.a307.fifteenfive.api.controller;

import com.a307.fifteenfive.api.requestDTO.ReviewRequestDto;
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
@Api(value = "리뷰 좋아요 API", tags = {"ReviewLike"})
@RestController
@RequestMapping("/api/reviews")
public class ReviewLikeController {

    private final ReviewService reviewService;
    private final UserService userService;
    private final ReviewLikeService reviewLikeService;


    @Autowired
    public ReviewLikeController(ReviewService reviewService, UserService userService, ReviewLikeService reviewLikeService) {
        this.reviewService = reviewService;
        this.userService = userService;
        this.reviewLikeService = reviewLikeService;
    }


    // 리뷰 좋아요
    @PostMapping("/{review_id}/likes")
    @ApiOperation(value = "해당 리뷰 좋아요", notes = "해당 리뷰 좋아요 추가한다.")
    public ResponseEntity<?> likeReview(@AuthenticationPrincipal String token, @PathVariable("review_id") Integer review_id) {

        User user = userService.getUserByUserEmail(token);
        Review review = reviewService.getReviewByReviewId(review_id);
        reviewLikeService.likeReview(user, review);

        return new ResponseEntity<>("OK", HttpStatus.OK);
    }

    // 리뷰 좋아요 취소
    @DeleteMapping("/{review_id}/no_likes")
    @ApiOperation(value = "해당 리뷰 좋아요 취소", notes = "해당 리뷰 좋아요 취소한다.")
    public ResponseEntity<?> noLikeReview(@AuthenticationPrincipal String token, @PathVariable("review_id") Integer review_id) {

        User user = userService.getUserByUserEmail(token);
        reviewLikeService.noLikeReview(user.getUserId(), review_id);

        return new ResponseEntity<>("OK", HttpStatus.OK);
    }

    // 리뷰 좋아요 수, 좋아요 여부 반환
    @GetMapping("/{review_id}/likes")
    @ApiOperation(value = "해당 리뷰 좋아요수, 여부", notes = "해당 리뷰 좋아요수, 여부 반환")
    public ResponseEntity<?> likes(@AuthenticationPrincipal String token, @PathVariable("review_id") Integer review_id) {

        HashMap<String, Object> resultList = new HashMap<>();

        User user = userService.getUserByUserEmail(token);
        Review review = reviewService.getReviewByReviewId(review_id);
        int cnt = reviewLikeService.totalLikes(review);
        int isLiked = reviewLikeService.isLiked(user, review);

        resultList.put("totalLike", cnt);
        resultList.put("isLiked", isLiked);

        return new ResponseEntity<>(resultList, HttpStatus.OK);
    }
}
