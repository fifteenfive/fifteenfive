package com.a307.fifteenfive.db.entity;


import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "wine_wishlist")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Wish {

    @Id
    @Column(name="wine_wishlist_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer wineWishlistId;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "wine_id")
    private Integer wineId;

}
