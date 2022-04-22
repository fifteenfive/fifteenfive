package com.a307.fifteenfive.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QLifestyleRecommendWine is a Querydsl query type for LifestyleRecommendWine
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QLifestyleRecommendWine extends EntityPathBase<LifestyleRecommendWine> {

    private static final long serialVersionUID = 1239657842L;

    public static final QLifestyleRecommendWine lifestyleRecommendWine = new QLifestyleRecommendWine("lifestyleRecommendWine");

    public final StringPath EngName = createString("EngName");

    public final StringPath KorName = createString("KorName");

    public final StringPath lifestyleCode = createString("lifestyleCode");

    public final NumberPath<Integer> lifestyleRecoId = createNumber("lifestyleRecoId", Integer.class);

    public final NumberPath<Float> score = createNumber("score", Float.class);

    public final NumberPath<Integer> wine_id = createNumber("wine_id", Integer.class);

    public final StringPath wineImage = createString("wineImage");

    public QLifestyleRecommendWine(String variable) {
        super(LifestyleRecommendWine.class, forVariable(variable));
    }

    public QLifestyleRecommendWine(Path<? extends LifestyleRecommendWine> path) {
        super(path.getType(), path.getMetadata());
    }

    public QLifestyleRecommendWine(PathMetadata metadata) {
        super(LifestyleRecommendWine.class, metadata);
    }

}

