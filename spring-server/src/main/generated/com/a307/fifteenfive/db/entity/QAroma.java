package com.a307.fifteenfive.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QAroma is a Querydsl query type for Aroma
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QAroma extends EntityPathBase<Aroma> {

    private static final long serialVersionUID = 1656704880L;

    public static final QAroma aroma = new QAroma("aroma");

    public final NumberPath<Integer> aromaId = createNumber("aromaId", Integer.class);

    public final StringPath aromaName = createString("aromaName");

    public QAroma(String variable) {
        super(Aroma.class, forVariable(variable));
    }

    public QAroma(Path<? extends Aroma> path) {
        super(path.getType(), path.getMetadata());
    }

    public QAroma(PathMetadata metadata) {
        super(Aroma.class, metadata);
    }

}

