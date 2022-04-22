package com.a307.fifteenfive.api.responseDTO;

import com.a307.fifteenfive.db.entity.LifestyleRecommendWine;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("SimpleWineResponse")
public class SimpleWineResponseDto {
    @ApiModelProperty(name="wine_id")
    private Integer wineId;

    @ApiModelProperty(name = "score")
    private Float score;

    @ApiModelProperty(name = "kor_name")
    private String KorName;

    @ApiModelProperty(name = "eng_name")
    private String EngName;

    @ApiModelProperty(name = "wine_image")
    private String wineImage;

    public static SimpleWineResponseDto of (LifestyleRecommendWine lifestyleRecommendWine) {

        SimpleWineResponseDto body = new SimpleWineResponseDto();
        body.setWineId(lifestyleRecommendWine.getWine_id());
        body.setWineImage(lifestyleRecommendWine.getWineImage());
        body.setKorName(lifestyleRecommendWine.getKorName());
        body.setEngName(lifestyleRecommendWine.getEngName());
        body.setScore(lifestyleRecommendWine.getScore());

        return body;

    }
}
