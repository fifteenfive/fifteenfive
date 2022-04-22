package com.a307.fifteenfive.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QBestTenRed is a Querydsl query type for BestTenRed
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QBestTenRed extends EntityPathBase<BestTenRed> {

    private static final long serialVersionUID = 2026667514L;

    public static final QBestTenRed bestTenRed = new QBestTenRed("bestTenRed");

    public final StringPath engName = createString("engName");

    public final StringPath korName = createString("korName");

    public final StringPath rankDate = createString("rankDate");

    public final NumberPath<Integer> ranking = createNumber("ranking", Integer.class);

    public final NumberPath<Integer> redId = createNumber("redId", Integer.class);

    public final NumberPath<Float> score = createNumber("score", Float.class);

    public final NumberPath<Integer> wineId = createNumber("wineId", Integer.class);

    public final StringPath wineImage = createString("wineImage");

    public QBestTenRed(String variable) {
        super(BestTenRed.class, forVariable(variable));
    }

    public QBestTenRed(Path<? extends BestTenRed> path) {
        super(path.getType(), path.getMetadata());
    }

    public QBestTenRed(PathMetadata metadata) {
        super(BestTenRed.class, metadata);
    }

}

