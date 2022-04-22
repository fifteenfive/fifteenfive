package com.a307.fifteenfive.db.repository;

import com.a307.fifteenfive.db.entity.Review;
import com.a307.fifteenfive.db.entity.Wine;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends PagingAndSortingRepository<Review, Integer> {

    Review findReviewByReviewId(int id);

    void deleteReviewByReviewId(int id);

    @Query(value = "SELECT * FROM review as r WHERE r.wine_id = :wineId", nativeQuery = true)
    List<Review> findAllReviewsByWineId(int wineId, Pageable Pageable);

    @Query(value = "SELECT COUNT(*) FROM review as r WHERE r.wine_id = :wineId", nativeQuery = true)
    int countByWineId(int wineId);

    @Query(value = "SELECT * FROM review as r WHERE r.wine_id = :wineId AND r.user_id = :userId ORDER BY r.created_time DESC", nativeQuery = true)
    List<Review> findAllReviewsByUserIdAndWineId(int userId, int wineId);

    @Query(value = "SELECT * from review where user_id = :userId", nativeQuery = true)
    public List<Review> myReviewList(int userId);

    @Query(value = "SELECT * from review where user_id = :userId and score >= 4", nativeQuery = true)
    public List<Review> myRecommendReviewList(int userId);

}


