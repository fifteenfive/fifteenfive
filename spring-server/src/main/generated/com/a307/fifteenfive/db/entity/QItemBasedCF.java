package com.a307.fifteenfive.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QItemBasedCF is a Querydsl query type for ItemBasedCF
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QItemBasedCF extends EntityPathBase<ItemBasedCF> {

    private static final long serialVersionUID = 1370946881L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QItemBasedCF itemBasedCF = new QItemBasedCF("itemBasedCF");

    public final NumberPath<Integer> Id = createNumber("Id", Integer.class);

    public final QUser user;

    public final QWine wine;

    public QItemBasedCF(String variable) {
        this(ItemBasedCF.class, forVariable(variable), INITS);
    }

    public QItemBasedCF(Path<? extends ItemBasedCF> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QItemBasedCF(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QItemBasedCF(PathMetadata metadata, PathInits inits) {
        this(ItemBasedCF.class, metadata, inits);
    }

    public QItemBasedCF(Class<? extends ItemBasedCF> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user")) : null;
        this.wine = inits.isInitialized("wine") ? new QWine(forProperty("wine")) : null;
    }

}

