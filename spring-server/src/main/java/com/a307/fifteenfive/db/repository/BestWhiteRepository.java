package com.a307.fifteenfive.db.repository;

import com.a307.fifteenfive.db.entity.BestTenRed;
import com.a307.fifteenfive.db.entity.BestTenWhite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BestWhiteRepository extends JpaRepository<BestTenWhite, Integer> {

    @Query(value = "SELECT * FROM bestTenWhite", nativeQuery = true)
    List<BestTenWhite> findRankingWhite();
}
