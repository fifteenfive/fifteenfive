package com.a307.fifteenfive.db.entity;

import lombok.*;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "wine")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Wine {

    @Id
    @Column(name="wine_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer wineId;

    @Column(name = "score")
    private Float score;

    @Column(name = "kor_name")
    private String KorName;

    @Column(name = "eng_name")
    private String EngName;

    @Column(name = "wine_type")
    private String wineType;

    @Column(name = "wine_country")
    private String wineCountry;

    @Column(name = "wine_price")
    private Integer winePrice;

    @Column(name = "wine_vintage")
    private Integer wineVintage;

    @Column(name = "wine_sweet")
    private Integer wineSweet;

    @Column(name = "wine_acidity")
    private Integer wineAcidity;

    @Column(name = "wine_body")
    private Integer wineBody;

    @Column(name = "wine_tannin")
    private Integer wineTannin;

    @ManyToMany
    @JoinTable(name = "wine_aroma", joinColumns = @JoinColumn(name = "wine_id"),
    inverseJoinColumns = @JoinColumn(name = "aroma_id"))
    private List<Aroma> aromaList = new ArrayList<>();

    @Column(name = "wine_image")
    private String wineImage;

}
