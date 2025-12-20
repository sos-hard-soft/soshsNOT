package com.sosnot.registry.resource;

import com.sosnot.registry.model.ClientMorale;
import com.sosnot.registry.model.ClientPhysique;
import com.sosnot.registry.service.ClientService;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@Path("/api/clients")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class ClientResource {

    @Inject
    ClientService service;

    /* ===== PHYSIQUE ===== */

    @POST
    @Path("/physiques")
    public Response createPhysique(ClientPhysique client) {
        UUID id = service.createPhysique(client);
        return Response.created(URI.create("/api/clients/physiques/" + id)).build();
    }

    @GET
    @Path("/physiques/{id}")
    public ClientPhysique getPhysique(@PathParam("id") UUID id) {
        return service.getPhysiqueById(id);
    }

    @GET
    @Path("/physiques")
    public ClientPhysique findByCin(@QueryParam("cin") String cin) {
        return service.findPhysiqueByCin(cin);
    }

    /* ===== MORALE ===== */

    @POST
    @Path("/morales")
    public Response createMorale(ClientMorale client) {
        UUID id = service.createMorale(client);
        return Response.created(URI.create("/api/clients/morales/" + id)).build();
    }

    @GET
    @Path("/morales/{id}")
    public ClientMorale getMorale(@PathParam("id") UUID id) {
        return service.getMoraleById(id);
    }

    @GET
    @Path("/morales")
    public List<ClientMorale> searchMorale(
            @QueryParam("ice") String ice,
            @QueryParam("raisonSociale") String rs) {

        if (ice != null) {
            return List.of(service.findMoraleByIce(ice));
        }
        if (rs != null) {
            return service.searchMoraleByRaisonSociale(rs);
        }
        throw new BadRequestException("Critère requis");
    }

    /* ===== COMMUN ===== */

    @PUT
    @Path("/{id}/deactivate")
    public Response deactivate(@PathParam("id") UUID id) {
        service.deactivate(id);
        return Response.noContent().build();
    }
}