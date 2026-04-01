package com.recruitify.webapi.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends BaseException {

    private static final String DEFAULT_ERROR_CODE = "NOT_FOUND_001";

    public ResourceNotFoundException(String message) {
        super(message, HttpStatus.NOT_FOUND, DEFAULT_ERROR_CODE);
    }

    public ResourceNotFoundException(String resourceName, String fieldName, Object fieldValue) {
        super(String.format("%s not found with %s: '%s'", resourceName, fieldName, fieldValue),
                HttpStatus.NOT_FOUND, DEFAULT_ERROR_CODE);
    }

    public static ResourceNotFoundException create(String resourceName, String fieldName, Object fieldValue) {
        return new ResourceNotFoundException(resourceName);
    }
}