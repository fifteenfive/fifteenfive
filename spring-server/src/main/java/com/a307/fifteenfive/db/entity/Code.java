package com.a307.fifteenfive.db.entity;

import lombok.*;

import javax.persistence.*;


@Entity
@Table(name = "code")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Code {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "code_id")
    private String codeId;

    @Column(name = "code_name", unique = true)
    private String codeName;

    @Column(name = "code_name_eng")
    private String codeNameEng;

    @ManyToOne
    @JoinColumn(name = "common_code_type_code_type_id")
    private CodeType codeType;

    public void setCodeType(CodeType codeType) {
        this.codeType = codeType;
    }

}
