package com.a307.fifteenfive.db.entity;

import lombok.*;

import javax.persistence.*;


@Table(name = "lifestyle_recommend_wine")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class LifestyleRecommendWine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="life_reco_id")
    private Integer lifestyleRecoId;

    @Column(name="lifestyle_code")
    private String lifestyleCode;

    @Column(name="wine_id")
    private Integer wine_id;

    @Column(name = "kor_name")
    private String KorName;

    @Column(name = "eng_name")
    private String EngName;

    @Column(name = "score")
    private Float score;

    @Column(name = "wine_image")
    private String wineImage;}
