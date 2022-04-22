package com.a307.fifteenfive.db.repository;


import com.a307.fifteenfive.db.entity.LifestyleRecommendWine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface LifestyleRecommendWineRepository extends JpaRepository<LifestyleRecommendWine, Integer> {

    @Query(value = "SELECT * from lifestyle_recommend_wine WHERE lifestyle_code = :lifestyleCode", nativeQuery = true)
    List<LifestyleRecommendWine> findRecoWinesByWineLifestyleCode(String lifestyleCode);

}
