package com.sosnot.registry.resource;

import com.sosnot.registry.dto.DocumentDTO;
import com.sosnot.registry.service.DocumentService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.jboss.resteasy.reactive.RestForm;
import org.jboss.resteasy.reactive.multipart.FileUpload;

import java.io.IOException;
import java.nio.file.Files;
import java.util.List;
import java.util.UUID;

@Path("/api/documents")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class DocumentResource {

    @Inject
    DocumentService documentService;

    @GET
    @Path("/client/{clientId}")
    public List<DocumentDTO> listDocuments(@PathParam("clientId") UUID clientId) {
        return documentService.listFiles(clientId);
    }

    @POST
    @Path("/client/{clientId}/upload")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response uploadDocument(
            @PathParam("clientId") UUID clientId,
            @RestForm("file") FileUpload file) throws IOException {

        if (file == null) {
            return Response.status(Response.Status.BAD_REQUEST).entity("No file uploaded").build();
        }

        byte[] data = Files.readAllBytes(file.filePath());
        documentService.uploadFile(clientId, file.fileName(), file.contentType(), data);

        return Response.status(Response.Status.CREATED).build();
    }

    @DELETE
    @Path("/client/{clientId}/{fileName}")
    public Response deleteDocument(
            @PathParam("clientId") UUID clientId,
            @PathParam("fileName") String fileName) {

        documentService.deleteFile(clientId, fileName);
        return Response.noContent().build();
    }
}
