package com.a307.fifteenfive.api.service;

import com.a307.fifteenfive.db.entity.Review;
import com.a307.fifteenfive.db.entity.ReviewLike;
import com.a307.fifteenfive.db.entity.User;
import com.a307.fifteenfive.db.repository.ReviewLikeRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Slf4j
@Service
public class ReviewLikeService {

    private final ReviewLikeRepository reviewLikeRepository;

    @Autowired ReviewLikeService(ReviewLikeRepository reviewLikeRepository) {
        this.reviewLikeRepository = reviewLikeRepository;
    }


    // 리뷰 좋아요
    @Transactional
    public void likeReview (User user, Review review){

        ReviewLike reviewLike = new ReviewLike();

        reviewLike.setUser(user);
        reviewLike.setReview(review);

        reviewLikeRepository.save(reviewLike);

    }


    // 리뷰 좋아요 취소
    @Transactional
    public void noLikeReview (int user_id, int review_id){

        reviewLikeRepository.deleteByReviewIdAndUserId(user_id, review_id);

    }

    // 리뷰 좋아요 여부
    @Transactional
    public int isLiked (User user, Review review){
        return reviewLikeRepository.countByReviewIdAndUserId(review, user);
    }

    // 리뷰 좋아요 개수
    @Transactional
    public int totalLikes (Review review){
        int totalLikes = reviewLikeRepository.countByReviewId(review);

        return totalLikes;
    }

}
