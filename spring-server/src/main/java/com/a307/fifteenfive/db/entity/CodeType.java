package com.a307.fifteenfive.db.entity;

import lombok.*;

import javax.persistence.*;


@Entity
@Table(name = "code_type")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CodeType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="code_type_id")
    private String codeTypeId;

    @Column(name = "code_type_name", unique = true)
    private String codeTypeName;

    @Column(name = "code_type_name_eng")
    private String codeTypeNameEng;

}
