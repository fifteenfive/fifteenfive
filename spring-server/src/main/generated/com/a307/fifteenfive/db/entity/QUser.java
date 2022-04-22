package com.a307.fifteenfive.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = -777245427L;

    public static final QUser user = new QUser("user");

    public final StringPath roles = createString("roles");

    public final StringPath userEmail = createString("userEmail");

    public final NumberPath<Integer> userId = createNumber("userId", Integer.class);

    public final StringPath userLifestyleCode = createString("userLifestyleCode");

    public final StringPath userNickname = createString("userNickname");

    public final StringPath userPassword = createString("userPassword");

    public final StringPath userProfileUrl = createString("userProfileUrl");

    public QUser(String variable) {
        super(User.class, forVariable(variable));
    }

    public QUser(Path<? extends User> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUser(PathMetadata metadata) {
        super(User.class, metadata);
    }

}

