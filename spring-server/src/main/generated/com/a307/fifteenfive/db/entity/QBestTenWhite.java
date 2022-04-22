package com.a307.fifteenfive.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QBestTenWhite is a Querydsl query type for BestTenWhite
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QBestTenWhite extends EntityPathBase<BestTenWhite> {

    private static final long serialVersionUID = 2012011346L;

    public static final QBestTenWhite bestTenWhite = new QBestTenWhite("bestTenWhite");

    public final StringPath engName = createString("engName");

    public final StringPath korName = createString("korName");

    public final StringPath rankDate = createString("rankDate");

    public final NumberPath<Integer> ranking = createNumber("ranking", Integer.class);

    public final NumberPath<Float> score = createNumber("score", Float.class);

    public final NumberPath<Integer> whiteId = createNumber("whiteId", Integer.class);

    public final NumberPath<Integer> wineId = createNumber("wineId", Integer.class);

    public final StringPath wineImage = createString("wineImage");

    public QBestTenWhite(String variable) {
        super(BestTenWhite.class, forVariable(variable));
    }

    public QBestTenWhite(Path<? extends BestTenWhite> path) {
        super(path.getType(), path.getMetadata());
    }

    public QBestTenWhite(PathMetadata metadata) {
        super(BestTenWhite.class, metadata);
    }

}

