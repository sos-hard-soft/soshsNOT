package com.sosnot.registry.dto;

import java.time.LocalDateTime;

public class DocumentDTO {
    public String fileName;
    public long size;
    public String contentType;
    public LocalDateTime lastModified;
    public String url; // Presigned URL for preview/download

    public DocumentDTO() {
    }

    public DocumentDTO(String fileName, long size, String contentType, LocalDateTime lastModified) {
        this.fileName = fileName;
        this.size = size;
        this.contentType = contentType;
        this.lastModified = lastModified;
    }
}
