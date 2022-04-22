package com.a307.fifteenfive.api.requestDTO;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ReviewRequestDto {

        @ApiModelProperty(value = "리뷰 평점")
        private Float score;

        @ApiModelProperty(value = "리뷰 내용")
        private String content;

        @ApiModelProperty(value = "당도")
        private Integer reviewSweet;

        @ApiModelProperty(value = "산도")
        private Integer reviewAcidity;

        @ApiModelProperty(value = "타닌")
        private Integer reviewTannin;

        @ApiModelProperty(value = "바디감")
        private Integer reviewBody;
}
