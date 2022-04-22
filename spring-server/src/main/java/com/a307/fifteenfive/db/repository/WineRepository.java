package com.a307.fifteenfive.db.repository;

import com.a307.fifteenfive.db.entity.Wine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface WineRepository extends JpaRepository<Wine, Integer> {

    Wine findWineByWineId(int id);

    @Query(value = "SELECT * FROM wine INNER JOIN lifestyle_wine ON wine.wine_id = lifestyle_wine.wine_id\n" +
            "WHERE lifestyle_wine.lifestyle_code = :lifeStyleCode", nativeQuery = true)
    List<Wine> findWinesByWineLifestyleCodeOrderByScore(@Param("lifeStyleCode") String lifeStyleCode);

    @Query(value = "SELECT * from wine WHERE wine.wine_id in (SELECT wine_id from review \n" +
            "WHERE review.user_id IN (SELECT user_id FROM user\n" +
            "where user_lifestyle_code = :lifeStyleCode)) ORDER BY score", nativeQuery = true)
    List<Wine> findWinesBySameLifeStyleUserOrderByRate(@Param("lifeStyleCode") String lifeStyleCode);


    @Query(value = "SELECT * FROM wine as w\n" +
            "INNER JOIN\n" +
            "(SELECT * from userBasedCF WHERE userBasedCF.user_id= :userId) ucf\n" +
            "ON w.wine_id = ucf.wine_id", nativeQuery = true)
    List<Wine> findWinesByUserBasedCF(int userId);

    @Query(value = "SELECT * FROM wine as w\n" +
            "INNER JOIN\n" +
            "itemBasedCF as icf\n" +
            "ON w.wine_id = icf.recomm_wine_id where icf.based_wine_id = :wineId", nativeQuery = true)
    List<Wine> findWinesByItemBasedCF(int wineId);

    @Query(value = "SELECT * FROM wine as w WHERE w.kor_name LIKE %?1% or w.eng_name LIKE %?1% LIMIT 50", nativeQuery = true)
    public List<Wine> findWinelist(String word);

    @Query(value = "SELECT * from wine_wishlist wish inner join wine w on wish.wine_id = w.wine_id where wish.user_id = :userId", nativeQuery = true)
    public List<Wine> myWishlist(int userId);

    @Query(value = "SELECT * from review r inner join wine w on r.wine_id = w.wine_id where r.user_id = :userId", nativeQuery = true)
    public List<Wine> myReflist(int userId);
}
