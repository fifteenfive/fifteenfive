package com.a307.fifteenfive.api.service;

import com.a307.fifteenfive.api.responseDTO.SimpleWineResponseDto;
import com.a307.fifteenfive.api.responseDTO.WineResponseDto;
import com.a307.fifteenfive.db.entity.LifestyleRecommendWine;
import com.a307.fifteenfive.db.entity.Wine;
import com.a307.fifteenfive.db.repository.CodeRepository;
import com.a307.fifteenfive.db.repository.WineRepository;
import com.a307.fifteenfive.db.repository.LifestyleRecommendWineRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class RecommendService {

    final WineRepository wineRepository;
    final CodeRepository codeRepository;
    final LifestyleRecommendWineRepository lifestyleRecommendWineRepository;

    public RecommendService(WineRepository wineRepository, CodeRepository codeRepository, LifestyleRecommendWineRepository lifestyleRecommendWineRepository) {
        this.wineRepository = wineRepository;
        this.codeRepository = codeRepository;
        this.lifestyleRecommendWineRepository = lifestyleRecommendWineRepository;
    }


    // 라이프스타일별 와인 추천리스트 (로그인시)
    public List<WineResponseDto> findWinesByWineLifestyleCodeOrderByScore(String lifeStyleCode) {

        List<WineResponseDto> wineResponseDtos = new ArrayList<>();

        List<Wine> wines = wineRepository.findWinesByWineLifestyleCodeOrderByScore(lifeStyleCode);

        for (Wine wine:wines) {
            wineResponseDtos.add(WineResponseDto.of(wine));
        }

        return wineResponseDtos;

    }

    // 라이프스타일별 와인 추천리스트 (메인화면)
    public List<SimpleWineResponseDto> findRecoWinesByWineLifestyleCode(String lifeStyleCode) {
        List<SimpleWineResponseDto> simpleWineResponseDtos = new ArrayList<>();

        List<LifestyleRecommendWine> lifestyleRecommendWines = lifestyleRecommendWineRepository.findRecoWinesByWineLifestyleCode(lifeStyleCode);

        for (LifestyleRecommendWine lifestyleRecommendWine:lifestyleRecommendWines ) {
            simpleWineResponseDtos.add(SimpleWineResponseDto.of(lifestyleRecommendWine));
        }

        return simpleWineResponseDtos;
    }

    // 동일 라이프스타일 유저의 와인리스트 (메인화면)
    public List<WineResponseDto> findWinesBySameLifeStyleUserOrderByRate(String lifeStyleCode) {

        List<WineResponseDto> wineResponseDtos = new ArrayList<>();

        List<Wine> wines = wineRepository.findWinesBySameLifeStyleUserOrderByRate(lifeStyleCode);

        for (Wine wine:wines) {
            wineResponseDtos.add(WineResponseDto.of(wine));
        }

        return wineResponseDtos;

    }

    public String getLifeStyleName(String lifeStyleCode) {

        String lifestyleName = codeRepository.getCodeByCodeId(lifeStyleCode).getCodeName();

        return lifestyleName;

    }


    // 유저별 협업필터링 추천 - 유저 기반
    @Transactional
    public List<WineResponseDto> findWinesByUserBasedCF(int userId) {

        List<WineResponseDto> wineResponseDtos = new ArrayList<>();

        List<Wine> wines = wineRepository.findWinesByUserBasedCF(userId);

        for (Wine wine:wines) {
            wineResponseDtos.add(WineResponseDto.of(wine));
        }

        return wineResponseDtos;
    }


    // 유저별 협업필터링 추천 - 아이템 기반
    @Transactional
    public List<Wine> findWinesByItemBasedCF(int userId) {
        List<Wine> wines = wineRepository.findWinesByItemBasedCF(userId);

        return wines;
    }

}
