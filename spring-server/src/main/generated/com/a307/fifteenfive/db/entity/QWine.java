package com.a307.fifteenfive.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QWine is a Querydsl query type for Wine
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QWine extends EntityPathBase<Wine> {

    private static final long serialVersionUID = -777195189L;

    public static final QWine wine = new QWine("wine");

    public final ListPath<Aroma, QAroma> aromaList = this.<Aroma, QAroma>createList("aromaList", Aroma.class, QAroma.class, PathInits.DIRECT2);

    public final StringPath EngName = createString("EngName");

    public final StringPath KorName = createString("KorName");

    public final NumberPath<Float> score = createNumber("score", Float.class);

    public final NumberPath<Integer> wineAcidity = createNumber("wineAcidity", Integer.class);

    public final NumberPath<Integer> wineBody = createNumber("wineBody", Integer.class);

    public final StringPath wineCountry = createString("wineCountry");

    public final NumberPath<Integer> wineId = createNumber("wineId", Integer.class);

    public final StringPath wineImage = createString("wineImage");

    public final NumberPath<Integer> winePrice = createNumber("winePrice", Integer.class);

    public final NumberPath<Integer> wineSweet = createNumber("wineSweet", Integer.class);

    public final NumberPath<Integer> wineTannin = createNumber("wineTannin", Integer.class);

    public final StringPath wineType = createString("wineType");

    public final NumberPath<Integer> wineVintage = createNumber("wineVintage", Integer.class);

    public QWine(String variable) {
        super(Wine.class, forVariable(variable));
    }

    public QWine(Path<? extends Wine> path) {
        super(path.getType(), path.getMetadata());
    }

    public QWine(PathMetadata metadata) {
        super(Wine.class, metadata);
    }

}

