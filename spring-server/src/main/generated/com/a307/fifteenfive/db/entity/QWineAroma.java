package com.a307.fifteenfive.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QWineAroma is a Querydsl query type for WineAroma
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QWineAroma extends EntityPathBase<WineAroma> {

    private static final long serialVersionUID = 495361511L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QWineAroma wineAroma = new QWineAroma("wineAroma");

    public final QAroma aroma;

    public final QWine wine;

    public final NumberPath<Integer> wineAromaId = createNumber("wineAromaId", Integer.class);

    public QWineAroma(String variable) {
        this(WineAroma.class, forVariable(variable), INITS);
    }

    public QWineAroma(Path<? extends WineAroma> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QWineAroma(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QWineAroma(PathMetadata metadata, PathInits inits) {
        this(WineAroma.class, metadata, inits);
    }

    public QWineAroma(Class<? extends WineAroma> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.aroma = inits.isInitialized("aroma") ? new QAroma(forProperty("aroma")) : null;
        this.wine = inits.isInitialized("wine") ? new QWine(forProperty("wine")) : null;
    }

}

