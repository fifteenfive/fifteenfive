package com.a307.fifteenfive.api.responseDTO;

import com.a307.fifteenfive.db.entity.Aroma;
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
@ApiModel("WineResponse")
public class WineResponseDto {

    @ApiModelProperty(name="wine_id")
    private Integer wineId;

    @ApiModelProperty(name = "score")
    private Float score;

    @ApiModelProperty(name = "kor_name")
    private String KorName;

    @ApiModelProperty(name = "eng_name")
    private String EngName;

    @ApiModelProperty(name = "wine_type")
    private String wineType;

    @ApiModelProperty(name = "wine_country")
    private String wineCountry;

    @ApiModelProperty(name = "wine_price")
    private Integer winePrice;

    @ApiModelProperty(name = "wine_vintage")
    private Integer wineVintage;

    @ApiModelProperty(name = "wine_sweet")
    private Integer wineSweet;

    @ApiModelProperty(name = "wine_acidity")
    private Integer wineAcidity;

    @ApiModelProperty(name = "wine_body")
    private Integer wineBody;

    @ApiModelProperty(name = "wine_tannin")
    private Integer wineTannin;

    @ApiModelProperty(name = "wine_aroma") // 아로마 정보 추가
    private List<Aroma> aromaList;

    @ApiModelProperty(name = "wine_image")
    private String wineImage;

    public static WineResponseDto of(Wine wine) {

        WineResponseDto body = new WineResponseDto();
        body.setWineId(wine.getWineId());
        body.setScore(wine.getScore());
        body.setKorName(wine.getKorName());
        body.setEngName(wine.getEngName());
        body.setWineType(wine.getWineType());
        body.setWineCountry(wine.getWineCountry());
        body.setWinePrice(wine.getWinePrice());
        body.setWineVintage(wine.getWineVintage());
        body.setWineSweet(wine.getWineSweet());
        body.setWineAcidity(wine.getWineAcidity());
        body.setWineTannin(wine.getWineTannin());
        body.setAromaList(wine.getAromaList());
        body.setWineBody(wine.getWineBody());
        body.setWineImage(wine.getWineImage());

        return body;
    }

}
