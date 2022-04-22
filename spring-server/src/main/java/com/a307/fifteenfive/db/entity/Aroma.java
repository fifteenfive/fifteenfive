package com.a307.fifteenfive.db.entity;


import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "aroma")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Aroma {

    @Id
    @Column(name="aroma_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer aromaId;

    @Column(name = "aroma_name")
    private String aromaName;


}
