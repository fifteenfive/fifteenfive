package com.a307.fifteenfive.api.responseDTO;

import com.a307.fifteenfive.db.entity.Aroma;
import com.a307.fifteenfive.db.entity.Review;
import com.a307.fifteenfive.db.entity.Wine;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import java.util.List;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("RefResponse")
public class RefResponseDto {

    @ApiModelProperty(name="wine_id")
    private Integer wineId;

    @ApiModelProperty(name = "kor_name")
    private String korName;

    @ApiModelProperty(name = "eng_name")
    private String engName;

    @ApiModelProperty(name = "wine_image")
    private String wineImage;

    public static RefResponseDto of(Wine wine) {

        RefResponseDto body = new RefResponseDto();
        body.setWineId(wine.getWineId());
        body.setKorName(wine.getKorName());
        body.setEngName(wine.getEngName());
        body.setWineImage(wine.getWineImage());

        return body;

    }
}
