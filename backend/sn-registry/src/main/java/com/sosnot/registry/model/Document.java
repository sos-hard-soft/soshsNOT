package com.sosnot.registry.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "document")
public class Document extends PanacheEntityBase {

    @Id
    @GeneratedValue
    @Column(columnDefinition = "uuid")
    public UUID id;

    @Column(nullable = false)
    public String fileName;

    @Column(nullable = false)
    public String contentType;

    @Column(nullable = false)
    public long size;

    @Column(nullable = false)
    public String s3Key;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id", nullable = false)
    public Client client;

    @CreationTimestamp
    @Column(name = "uploaded_at", nullable = false, updatable = false)
    public LocalDateTime uploadedAt;

    public Document() {
    }

    public Document(String fileName, String contentType, long size, String s3Key, Client client) {
        this.fileName = fileName;
        this.contentType = contentType;
        this.size = size;
        this.s3Key = s3Key;
        this.client = client;
    }
}
