package com.a307.fifteenfive.api.service;

import com.a307.fifteenfive.db.entity.BestTenRed;
import com.a307.fifteenfive.db.entity.BestTenWhite;
import com.a307.fifteenfive.db.repository.BestRedRepository;
import com.a307.fifteenfive.db.repository.BestWhiteRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class RankingService {

    BestRedRepository bestRedRepository;
    BestWhiteRepository bestWhiteRepository;

    public RankingService(BestRedRepository bestRedRepository, BestWhiteRepository bestWhiteRepository) {
        this.bestRedRepository = bestRedRepository;
        this.bestWhiteRepository = bestWhiteRepository;
    }

    public List<BestTenRed> getRankRed() {
        List<BestTenRed> bestTenReds = bestRedRepository.findRankingRed();
        log.info("와인리스트 검색{}", bestTenReds);
        return bestTenReds;
    }

    public List<BestTenWhite> getRankWhite() {
        List<BestTenWhite> bestTenWhites = bestWhiteRepository.findRankingWhite();
        log.info("와인리스트 검색{}", bestTenWhites);
        return bestTenWhites;
    }
}
