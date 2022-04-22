package com.a307.fifteenfive.api.service;

import com.a307.fifteenfive.api.responseDTO.WineResponseDto;
import com.a307.fifteenfive.db.entity.Wine;
import com.a307.fifteenfive.db.repository.WineRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class WineService {

    final WineRepository wineRepository;

    public WineService(WineRepository wineRepository) {
        this.wineRepository = wineRepository;
    }


    // 와인 상세정보
    public WineResponseDto getWineByWineId(int id) {

        Wine wine = wineRepository.findWineByWineId(id);

        WineResponseDto wineResponseDto = new WineResponseDto();
        wineResponseDto = WineResponseDto.of(wine);

        return wineResponseDto;

    }

    // 와인 검색
    public List<Wine> getWinelist(String word) {
        List<Wine> winelist = wineRepository.findWinelist(word);
        log.info("와인리스트 검색{}", winelist);
        return winelist;
    }
}
