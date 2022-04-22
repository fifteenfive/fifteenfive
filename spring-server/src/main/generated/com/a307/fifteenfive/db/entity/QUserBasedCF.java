package com.a307.fifteenfive.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUserBasedCF is a Querydsl query type for UserBasedCF
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QUserBasedCF extends EntityPathBase<UserBasedCF> {

    private static final long serialVersionUID = 1602997641L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUserBasedCF userBasedCF = new QUserBasedCF("userBasedCF");

    public final NumberPath<Integer> Id = createNumber("Id", Integer.class);

    public final QUser user;

    public final QWine wine;

    public QUserBasedCF(String variable) {
        this(UserBasedCF.class, forVariable(variable), INITS);
    }

    public QUserBasedCF(Path<? extends UserBasedCF> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUserBasedCF(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUserBasedCF(PathMetadata metadata, PathInits inits) {
        this(UserBasedCF.class, metadata, inits);
    }

    public QUserBasedCF(Class<? extends UserBasedCF> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user")) : null;
        this.wine = inits.isInitialized("wine") ? new QWine(forProperty("wine")) : null;
    }

}

