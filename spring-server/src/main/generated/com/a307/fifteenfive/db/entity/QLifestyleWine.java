package com.a307.fifteenfive.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QLifestyleWine is a Querydsl query type for LifestyleWine
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QLifestyleWine extends EntityPathBase<LifestyleWine> {

    private static final long serialVersionUID = -1985251620L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QLifestyleWine lifestyleWine = new QLifestyleWine("lifestyleWine");

    public final StringPath lifestyleCode = createString("lifestyleCode");

    public final NumberPath<Integer> lifestyleWindId = createNumber("lifestyleWindId", Integer.class);

    public final QWine wine;

    public QLifestyleWine(String variable) {
        this(LifestyleWine.class, forVariable(variable), INITS);
    }

    public QLifestyleWine(Path<? extends LifestyleWine> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QLifestyleWine(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QLifestyleWine(PathMetadata metadata, PathInits inits) {
        this(LifestyleWine.class, metadata, inits);
    }

    public QLifestyleWine(Class<? extends LifestyleWine> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.wine = inits.isInitialized("wine") ? new QWine(forProperty("wine")) : null;
    }

}

