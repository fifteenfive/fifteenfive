package com.a307.fifteenfive.db.repository;

import com.a307.fifteenfive.db.entity.Wish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface WishRepository extends JpaRepository<Wish, Integer> {

    @Query(value = "SELECT * FROM wine_wishlist as w WHERE w.user_id = :userId", nativeQuery = true)
    public List<Wish> findWishlistByUserId(int userId);

    @Query(value = "SELECT COUNT(*) FROM wine_wishlist as w WHERE w.user_id = :#{#userId} and w.wine_id = :#{#wineId}", nativeQuery = true)
    public int findWishlistByWineId(int userId, int wineId);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO wine_wishlist (user_id, wine_id) values (:#{#wish.userId}, :#{#wish.wineId})", nativeQuery = true)
    public int addWishlist(@Param(value = "wish") Wish wish);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM wine_wishlist as w WHERE w.user_id = :#{#wish.userId} and w.wine_id = :#{#wish.wineId} ", nativeQuery = true)
    public int deleteWishlist(@Param(value = "wish") Wish wish);

}
