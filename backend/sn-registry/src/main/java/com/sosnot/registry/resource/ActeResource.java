package com.sosnot.registry.resource;

import com.sosnot.registry.dto.ActeDTO;
import com.sosnot.registry.model.ActeQualite;
import com.sosnot.registry.service.ActeService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@Path("/api/actes")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class ActeResource {

    @Inject
    ActeService service;

    @GET
    public List<ActeDTO> getAll() {
        return service.getAllActes();
    }

    @GET
    @Path("/{id}")
    public ActeDTO getById(@PathParam("id") UUID id) {
        return service.getActeDTOById(id);
    }

    @PUT
    @Path("/{id}")
    public Response updateActe(@PathParam("id") UUID id, ActeDTO acte) {
        service.updateActe(id, acte);
        return Response.noContent().build();
    }

    @DELETE
    @Path("/{id}")
    public Response deleteActe(@PathParam("id") UUID id) {
        service.deleteActe(id);
        return Response.noContent().build();
    }

    @POST
    public Response createActe(ActeDTO acte) {
        UUID id = service.creerActe(acte);
        return Response.created(URI.create("/api/actes/" + id)).build();
    }

    @POST
    @Path("/{acteId}/parties")
    public Response addPartie(
            @PathParam("acteId") UUID acteId,
            @QueryParam("clientId") UUID clientId,
            @QueryParam("qualite") ActeQualite qualite) {

        service.ajouterPartie(acteId, clientId, qualite);
        return Response.status(Response.Status.CREATED).build();
    }

    @PUT
    @Path("/{acteId}/cloture")
    public Response cloturer(@PathParam("acteId") UUID acteId) {
        service.cloturerActe(acteId);
        return Response.noContent().build();
    }
}
