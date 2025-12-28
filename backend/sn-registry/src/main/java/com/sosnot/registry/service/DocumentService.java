package com.sosnot.registry.service;

import com.sosnot.registry.dto.DocumentDTO;
import com.sosnot.registry.model.Client;
import com.sosnot.registry.model.Document;
import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;
import software.amazon.awssdk.services.s3.presigner.model.PresignedGetObjectRequest;

import java.time.Duration;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@ApplicationScoped
public class DocumentService {

    @Inject
    S3Client s3;

    @Inject
    S3Presigner presigner;

    @ConfigProperty(name = "sosnot.documents.bucket")
    String bucketName;

    @PostConstruct
    void init() {
        try {
            s3.createBucket(CreateBucketRequest.builder().bucket(bucketName).build());
        } catch (BucketAlreadyExistsException | BucketAlreadyOwnedByYouException e) {
            // Bucket already exists, ignore
        }
    }

    public List<DocumentDTO> listFiles(UUID clientId) {
        return Document.find("client.id", clientId).stream()
                .map(doc -> {
                    Document document = (Document) doc;
                    DocumentDTO dto = new DocumentDTO(
                            document.fileName,
                            document.size,
                            document.contentType,
                            document.uploadedAt);
                    dto.url = getPresignedUrl(document.s3Key);
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @jakarta.transaction.Transactional
    public void uploadFile(UUID clientId, String fileName, String contentType, byte[] data) {
        Client client = Client.findById(clientId);
        if (client == null) {
            throw new RuntimeException("Client not found");
        }

        String key = "clients/" + clientId + "/" + UUID.randomUUID() + "_" + fileName;

        // S3 Upload
        s3.putObject(PutObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .contentType(contentType)
                .build(), RequestBody.fromBytes(data));

        // DB Persistence
        Document document = new Document(fileName, contentType, data.length, key, client);
        document.persist();
    }

    @jakarta.transaction.Transactional
    public void deleteFile(UUID clientId, String fileName) {
        Document document = (Document) Document.find("client.id = ?1 and fileName = ?2", clientId, fileName)
                .firstResult();
        if (document != null) {
            // S3 Delete
            s3.deleteObject(DeleteObjectRequest.builder()
                    .bucket(bucketName)
                    .key(document.s3Key)
                    .build());

            // DB Delete
            document.delete();
        }
    }

    public String getPresignedUrl(String key) {
        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build();

        GetObjectPresignRequest presignRequest = GetObjectPresignRequest.builder()
                .signatureDuration(Duration.ofMinutes(60))
                .getObjectRequest(getObjectRequest)
                .build();

        PresignedGetObjectRequest presignedRequest = presigner.presignGetObject(presignRequest);
        return presignedRequest.url().toString();
    }
}
