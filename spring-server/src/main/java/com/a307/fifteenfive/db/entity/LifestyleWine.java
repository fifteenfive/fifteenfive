package com.a307.fifteenfive.db.entity;

import lombok.*;
import javax.persistence.*;

@Entity
@Table(name = "lifestyle_wine")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LifestyleWine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="lifestyle_wine_id")
    private Integer lifestyleWindId;

    @ManyToOne
    @JoinColumn(name="wine_id")
    private Wine wine;

    @Column(name="lifestyle_code")
    private String lifestyleCode;
}
