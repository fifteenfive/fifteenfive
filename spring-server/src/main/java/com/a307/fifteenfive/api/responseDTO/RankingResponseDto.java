package com.a307.fifteenfive.api.responseDTO;

import com.a307.fifteenfive.db.entity.BestTenRed;
import com.a307.fifteenfive.db.entity.BestTenWhite;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RankingResponseDto {

    @ApiModelProperty(name = "red_id")
    private int redId;

    @ApiModelProperty(name = "white_id")
    private int whiteId;

    @ApiModelProperty(name = "ranking")
    private int ranking;

    @ApiModelProperty(name = "rank_date")
    private String rankDate;

    @ApiModelProperty(name = "wine_id")
    private int wineId;

    @ApiModelProperty(name = "kor_name")
    private String korName;

    @ApiModelProperty(name = "eng_name")
    private String engName;

    @ApiModelProperty(name = "score")
    private float score;

    public static RankingResponseDto of(BestTenRed bestTenRed){

        RankingResponseDto bodyRed = new RankingResponseDto();
        bodyRed.setRedId(bestTenRed.getRedId());
        bodyRed.setRanking(bestTenRed.getRanking());
        bodyRed.setRankDate(bestTenRed.getRankDate());
        bodyRed.setWineId(bestTenRed.getWineId());
        bodyRed.setKorName(bestTenRed.getKorName());
        bodyRed.setEngName(bestTenRed.getEngName());
        bodyRed.setScore(bestTenRed.getScore());
        return bodyRed;
    }

    public static RankingResponseDto of(BestTenWhite bestTenWhite){

        RankingResponseDto bodyWhite = new RankingResponseDto();
        bodyWhite.setWhiteId(bestTenWhite.getWhiteId());
        bodyWhite.setRanking(bestTenWhite.getRanking());
        bodyWhite.setRankDate(bestTenWhite.getRankDate());
        bodyWhite.setWineId(bestTenWhite.getWineId());
        bodyWhite.setKorName(bestTenWhite.getKorName());
        bodyWhite.setEngName(bestTenWhite.getEngName());
        bodyWhite.setScore(bestTenWhite.getScore());
        return bodyWhite;
    }
}
