package com.a307.fifteenfive.db.entity;

import lombok.*;
import javax.persistence.*;

@Entity
@Table(name = "itemBasedCF")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ItemBasedCF {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name="wine_id")
    private Wine wine;

}
