package com.a307.fifteenfive.db.entity;

import lombok.*;
import javax.persistence.*;


@Entity
@Table(name = "wine_aroma")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WineAroma  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="wine_aroma_id")
    private Integer wineAromaId;

    @ManyToOne
    @JoinColumn(name="wine_id")
    private Wine wine;

    @ManyToOne
    @JoinColumn(name="aroma_id")
    private Aroma aroma;

}
