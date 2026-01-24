package com.recruitify.common.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Standard API response wrapper
 * Sử dụng cho tất cả API responses để chuẩn hóa format
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Result<T> {

    /**
     * Indicates if the request was successful
     */
    private boolean success;

    /**
     * Human-readable message
     */
    private String message;

    /**
     * Response data (can be any type)
     */
    private T data;

    /**
     * Error code (null if success)
     */
    private String errorCode;

    /**
     * Timestamp of the response
     */
    @Builder.Default
    private LocalDateTime timestamp = LocalDateTime.now();

    /**
     * Create a successful response with data
     */
    public static <T> Result<T> success(T data) {
        return Result.<T>builder()
                .success(true)
                .message("Success")
                .data(data)
                .timestamp(LocalDateTime.now())
                .build();
    }

    /**
     * Create a successful response with data and custom message
     */
    public static <T> Result<T> success(T data, String message) {
        return Result.<T>builder()
                .success(true)
                .message(message)
                .data(data)
                .timestamp(LocalDateTime.now())
                .build();
    }

    /**
     * Create an error response
     */
    public static <T> Result<T> error(String message) {
        return Result.<T>builder()
                .success(false)
                .message(message)
                .timestamp(LocalDateTime.now())
                .build();
    }

    /**
     * Create an error response with error code
     */
    public static <T> Result<T> error(String message, String errorCode) {
        return Result.<T>builder()
                .success(false)
                .message(message)
                .errorCode(errorCode)
                .timestamp(LocalDateTime.now())
                .build();
    }
}
