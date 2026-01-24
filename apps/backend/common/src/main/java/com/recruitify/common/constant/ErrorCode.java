package com.recruitify.common.constant;

/**
 * API error codes
 */
public class ErrorCode {

    // Authentication & Authorization
    public static final String INVALID_CREDENTIALS = "AUTH_001";
    public static final String ACCOUNT_DEACTIVATED = "AUTH_002";
    public static final String ACCOUNT_LOCKED = "AUTH_003";
    public static final String TOKEN_EXPIRED = "AUTH_004";
    public static final String TOKEN_INVALID = "AUTH_005";
    public static final String UNAUTHORIZED = "AUTH_006";
    public static final String FORBIDDEN = "AUTH_007";

    // Validation
    public static final String VALIDATION_ERROR = "VAL_001";
    public static final String REQUIRED_FIELD_MISSING = "VAL_002";
    public static final String INVALID_FORMAT = "VAL_003";
    public static final String DUPLICATE_ENTRY = "VAL_004";

    // Resource
    public static final String RESOURCE_NOT_FOUND = "RES_001";
    public static final String RESOURCE_ALREADY_EXISTS = "RES_002";

    // Server
    public static final String INTERNAL_SERVER_ERROR = "SRV_001";
    public static final String SERVICE_UNAVAILABLE = "SRV_002";

    private ErrorCode() {
        // Private constructor to prevent instantiation
    }
}
