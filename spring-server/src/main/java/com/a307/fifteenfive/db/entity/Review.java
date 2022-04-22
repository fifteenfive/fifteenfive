package com.a307.fifteenfive.db.entity;


import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "review")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Review {

    @Id
    @Column(name="review_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer reviewId;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name="wine_id")
    private Wine wine;

    @Column(name = "review_img_url")
    private String reviewImgUrl;

    @Column(name = "score")
    private Float score;

    @Column(name = "content")
    private String content;

    @CreationTimestamp
    @Column(name = "created_time", updatable = false)
    private Timestamp createdTime;

    @Column(name = "review_sweet")
    private Integer reviewSweet;

    @Column(name = "review_acidity")
    private Integer reviewAcidity;

    @Column(name = "review_tannin")
    private Integer reviewTannin;

    @Column(name = "review_body")
    private Integer reviewBody;

}
