package com.sosnot.registry.resource;

import com.sosnot.registry.model.Client;
import com.sosnot.registry.model.ClientMorale;
import com.sosnot.registry.model.ClientPhysique;
import com.sosnot.registry.service.ClientService;
import jakarta.inject.Inject;
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

    @GET
    public List<Client> getAll() {
        return service.getAllClients();
    }

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
    @Path("/physiques/autocomplete")
    public List<ClientPhysique> autocompletePhysique(@QueryParam("q") String query) {
        return service.autocompletePhysique(query);
    }

    @GET
    @Path("/physiques/check-cin")
    public Response checkCin(@QueryParam("cin") String cin) {
        boolean exists = service.checkCinExists(cin);
        return Response.ok(exists).build();
    }

    @GET
    @Path("/physiques")
    public List<ClientPhysique> findByCin(@QueryParam("cin") String cin) {
        if (cin != null && !cin.isBlank()) {
            ClientPhysique cp = service.findPhysiqueByCin(cin);
            return cp != null ? List.of(cp) : List.of();
        }
        return service.getAllPhysiques();
    }

    @PUT
    @Path("/physiques/{id}")
    public Response updatePhysique(@PathParam("id") UUID id, ClientPhysique client) {
        service.updatePhysique(id, client);
        return Response.noContent().build();
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
    @Path("/morales/autocomplete")
    public List<ClientMorale> autocompleteMorale(@QueryParam("q") String query) {
        return service.autocompleteMorale(query);
    }

    @GET
    @Path("/morales/check-ice")
    public Response checkIce(@QueryParam("ice") String ice) {
        return Response.ok(service.checkIceExists(ice)).build();
    }

    @GET
    @Path("/morales/check-rc")
    public Response checkRc(@QueryParam("rc") String rc) {
        return Response.ok(service.checkRcExists(rc)).build();
    }

    @GET
    @Path("/morales/check-if")
    public Response checkIf(@QueryParam("if") String identifiantFiscal) {
        return Response.ok(service.checkIfExists(identifiantFiscal)).build();
    }

    @GET
    @Path("/morales")
    public List<ClientMorale> searchMorale(
            @QueryParam("ice") String ice,
            @QueryParam("raisonSociale") String rs) {

        if (ice != null && !ice.isBlank()) {
            ClientMorale cm = service.findMoraleByIce(ice);
            return cm != null ? List.of(cm) : List.of();
        }
        if (rs != null && !rs.isBlank()) {
            return service.autocompleteMorale(rs);
        }
        return service.getAllMorales();
    }

    @PUT
    @Path("/morales/{id}")
    public Response updateMorale(@PathParam("id") UUID id, ClientMorale client) {
        service.updateMorale(id, client);
        return Response.noContent().build();
    }

    /* ===== COMMUN ===== */

    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") UUID id) {
        service.deleteClient(id);
        return Response.noContent().build();
    }

    @PUT
    @Path("/{id}/deactivate")
    public Response deactivate(@PathParam("id") UUID id) {
        service.deactivate(id);
        return Response.noContent().build();
    }
}