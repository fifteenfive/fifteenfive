package com.a307.fifteenfive.db.repository;

import com.a307.fifteenfive.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    User findUserByUserId(int id);
    User findUserByUserEmail(String email);

}
