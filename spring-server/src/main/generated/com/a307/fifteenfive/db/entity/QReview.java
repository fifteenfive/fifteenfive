package com.a307.fifteenfive.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QReview is a Querydsl query type for Review
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QReview extends EntityPathBase<Review> {

    private static final long serialVersionUID = 293138458L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QReview review = new QReview("review");

    public final StringPath content = createString("content");

    public final DateTimePath<java.sql.Timestamp> createdTime = createDateTime("createdTime", java.sql.Timestamp.class);

    public final NumberPath<Integer> reviewAcidity = createNumber("reviewAcidity", Integer.class);

    public final NumberPath<Integer> reviewBody = createNumber("reviewBody", Integer.class);

    public final NumberPath<Integer> reviewId = createNumber("reviewId", Integer.class);

    public final StringPath reviewImgUrl = createString("reviewImgUrl");

    public final NumberPath<Integer> reviewSweet = createNumber("reviewSweet", Integer.class);

    public final NumberPath<Integer> reviewTannin = createNumber("reviewTannin", Integer.class);

    public final NumberPath<Float> score = createNumber("score", Float.class);

    public final QUser user;

    public final QWine wine;

    public QReview(String variable) {
        this(Review.class, forVariable(variable), INITS);
    }

    public QReview(Path<? extends Review> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QReview(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QReview(PathMetadata metadata, PathInits inits) {
        this(Review.class, metadata, inits);
    }

    public QReview(Class<? extends Review> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user")) : null;
        this.wine = inits.isInitialized("wine") ? new QWine(forProperty("wine")) : null;
    }

}

