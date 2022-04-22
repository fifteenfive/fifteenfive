package com.a307.fifteenfive.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QCodeType is a Querydsl query type for CodeType
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QCodeType extends EntityPathBase<CodeType> {

    private static final long serialVersionUID = 1926415113L;

    public static final QCodeType codeType = new QCodeType("codeType");

    public final StringPath codeTypeId = createString("codeTypeId");

    public final StringPath codeTypeName = createString("codeTypeName");

    public final StringPath codeTypeNameEng = createString("codeTypeNameEng");

    public QCodeType(String variable) {
        super(CodeType.class, forVariable(variable));
    }

    public QCodeType(Path<? extends CodeType> path) {
        super(path.getType(), path.getMetadata());
    }

    public QCodeType(PathMetadata metadata) {
        super(CodeType.class, metadata);
    }

}

