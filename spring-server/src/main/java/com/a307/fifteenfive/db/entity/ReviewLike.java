package com.a307.fifteenfive.db.entity;


import lombok.*;
import javax.persistence.*;

@Entity
@Table(name = "review_like")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReviewLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="review_like_id")
    private Integer ReviewLikeId;

    @ManyToOne
    @JoinColumn(name="review_id")
    private Review review;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
}
