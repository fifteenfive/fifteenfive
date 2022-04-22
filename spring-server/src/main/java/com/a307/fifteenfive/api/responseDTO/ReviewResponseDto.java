package com.a307.fifteenfive.api.responseDTO;

import com.a307.fifteenfive.db.entity.Review;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import java.sql.Timestamp;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("ReviewResponse")
public class ReviewResponseDto {

    @ApiModelProperty(name = "리뷰아이디")
    private Integer reviewId;

    @ApiModelProperty(name = "리뷰 유저 아이디")
    private Integer userId;

    @ApiModelProperty(name = "리뷰 유저 닉네임")
    private String userNickName;

    @ApiModelProperty(name = "리뷰 유저 프로필이미지 경로")
    private String userProfileUrl;

    @ApiModelProperty(name = "리뷰 이미지경로")
    private String reviewImgUrl;

    @ApiModelProperty(name = "리뷰 평점")
    private Float score;

    @ApiModelProperty(name = "리뷰 내용")
    private String content;

    @ApiModelProperty(name = "리뷰 생성시간")
    private Timestamp createdTime;

    @ApiModelProperty(name = "리뷰 당도")
    private Integer reviewSweet;

    @ApiModelProperty(name = "리뷰 산미")
    private Integer reviewAcidity;

    @ApiModelProperty(name = "리뷰 탄닌")
    private Integer reviewTannin;

    @ApiModelProperty(name = "리뷰 바디감")
    private Integer reviewBody;

    public static ReviewResponseDto of(Review review) {

        ReviewResponseDto body = new ReviewResponseDto();
        body.setReviewId(review.getReviewId());
        body.setUserId(review.getUser().getUserId());
        body.setUserNickName(review.getUser().getUserNickname());
        body.setUserProfileUrl(review.getUser().getUserProfileUrl());
        body.setReviewImgUrl(review.getReviewImgUrl());
        body.setScore(review.getScore());
        body.setContent(review.getContent());
        body.setCreatedTime(review.getCreatedTime());
        body.setReviewSweet(review.getReviewSweet());
        body.setReviewAcidity(review.getReviewAcidity());
        body.setReviewTannin(review.getReviewTannin());
        body.setReviewBody(review.getReviewBody());

        return body;

    }

}
