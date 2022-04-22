package com.a307.fifteenfive.db.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "bestTenRed")
@Builder
public class BestTenRed {

    @Id
    @Column(name = "red_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int redId;

    @Column(name = "ranking")
    private int ranking;

    @Column(name = "rank_date")
    private String rankDate;

    @Column(name = "wine_id")
    private int wineId;

    @Column(name = "kor_name")
    private String korName;

    @Column(name = "eng_name")
    private String engName;

    @Column(name = "score")
    private float score;

    @Column(name = "wine_image")
    private String wineImage;

}
