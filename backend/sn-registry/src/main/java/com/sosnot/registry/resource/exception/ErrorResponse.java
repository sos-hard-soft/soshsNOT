package com.sosnot.registry.resource.exception;

import java.time.LocalDateTime;

public record ErrorResponse(String message, String code, LocalDateTime timestamp) {
    public ErrorResponse(String message, String code) {
        this(message, code, LocalDateTime.now());
    }
}
