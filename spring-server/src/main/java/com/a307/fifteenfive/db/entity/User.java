package com.a307.fifteenfive.db.entity;


import lombok.*;

import javax.persistence.*;
import java.util.Arrays;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "user")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @Column(name="user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

    @Column(name = "user_email", unique = true, nullable = false)
    private String userEmail;

    @Column(name = "user_nickname")
    private String userNickname;

//    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(name = "user_password", nullable = false)
    private String userPassword;

    @Column(name = "user_profile_url")
    private String userProfileUrl;

    @Column(name = "user_lifestyle_code")
    private String userLifestyleCode;

    @Column(updatable = false, length = 10)
    private String roles; // USER, ADMIN

    // 롤 1개면 굳이 필요 없음
    public List<String> getRoleList() {
        if (this.roles.length() > 0) {
            return Arrays.asList(this.roles.split(","));
        }
        return new ArrayList<>();

    }

}
