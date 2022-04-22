package com.a307.fifteenfive.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QWish is a Querydsl query type for Wish
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QWish extends EntityPathBase<Wish> {

    private static final long serialVersionUID = -777195031L;

    public static final QWish wish = new QWish("wish");

    public final NumberPath<Integer> userId = createNumber("userId", Integer.class);

    public final NumberPath<Integer> wineId = createNumber("wineId", Integer.class);

    public final NumberPath<Integer> wineWishlistId = createNumber("wineWishlistId", Integer.class);

    public QWish(String variable) {
        super(Wish.class, forVariable(variable));
    }

    public QWish(Path<? extends Wish> path) {
        super(path.getType(), path.getMetadata());
    }

    public QWish(PathMetadata metadata) {
        super(Wish.class, metadata);
    }

}

