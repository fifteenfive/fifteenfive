package com.a307.fifteenfive.db.repository;

import com.a307.fifteenfive.db.entity.Code;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CodeRepository extends JpaRepository <Code, String> {

    Code getCodeByCodeId(String codeId);
}
