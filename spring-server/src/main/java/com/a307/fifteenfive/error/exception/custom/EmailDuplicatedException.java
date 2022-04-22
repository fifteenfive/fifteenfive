package com.a307.fifteenfive.error.exception.custom;

import com.a307.fifteenfive.error.exception.ErrorCode;

public class EmailDuplicatedException extends RuntimeException {

    private ErrorCode errorCode;

    public EmailDuplicatedException(ErrorCode errorCode) {
        super();
        this.errorCode = errorCode;
    }

    public ErrorCode getErrorCode() {
        return errorCode;
    }

}
