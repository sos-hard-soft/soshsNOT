package com.sosnot.registry.resource;

import com.sosnot.registry.model.Client;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/clients")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ClientResource {

    @GET
    public List<Client> list() {
        return Client.listAll();
    }

    @GET
    @Path("/{id}")
    public Client get(@PathParam("id") Long id) {
        return Client.findById(id);
    }

    @POST
    @Transactional
    public Response create(Client client) {
        if (client.id != null) {
            throw new WebApplicationException("Id was invalidly set on request.", 422);
        }
        client.persist();
        return Response.ok(client).status(201).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Client update(@PathParam("id") Long id, Client client) {
        if (client.firstName == null || client.lastName == null) {
            throw new WebApplicationException("Client Name was not set on request.", 422);
        }

        Client entity = Client.findById(id);
        if (entity == null) {
            throw new WebApplicationException("Client with id of " + id + " does not exist.", 404);
        }

        entity.firstName = client.firstName;
        entity.lastName = client.lastName;
        entity.cin = client.cin;
        entity.email = client.email;
        entity.phone = client.phone;
        
        return entity;
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response delete(@PathParam("id") Long id) {
        Client entity = Client.findById(id);
        if (entity == null) {
            throw new WebApplicationException("Client with id of " + id + " does not exist.", 404);
        }
        entity.delete();
        return Response.status(204).build();
    }
}
