package com.a307.fifteenfive.db.repository;

import com.a307.fifteenfive.db.entity.ReviewLike;
import com.a307.fifteenfive.db.entity.User;
import com.a307.fifteenfive.db.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewLikeRepository extends JpaRepository<ReviewLike, Integer> {

    @Modifying
    @Query(value = "DELETE FROM review_like as rl WHERE rl.user_id = :user_id AND rl.review_id = :review_id", nativeQuery = true)
    public void deleteByReviewIdAndUserId(int user_id, int review_id);

    @Query(value="SELECT COUNT(*) FROM review_like as r WHERE r.review_id = :reviewId", nativeQuery = true)
    int countByReviewId(Review reviewId);

    @Query(value="SELECT COUNT(*) FROM review_like as r WHERE r.user_id = :userId AND r.review_id = :reviewId", nativeQuery = true)
    int countByReviewIdAndUserId(Review reviewId, User userId);
}
