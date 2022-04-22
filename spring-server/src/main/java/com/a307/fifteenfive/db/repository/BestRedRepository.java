package com.a307.fifteenfive.db.repository;

import com.a307.fifteenfive.db.entity.BestTenWhite;
import com.a307.fifteenfive.db.entity.BestTenRed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BestRedRepository extends JpaRepository<BestTenRed, Integer> {

    @Query(value = "SELECT * FROM bestTenRed", nativeQuery = true)
    List<BestTenRed> findRankingRed();

}
