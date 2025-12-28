package com.sosnot.registry.service;

import com.sosnot.registry.model.Client;
import com.sosnot.registry.model.ClientMorale;
import com.sosnot.registry.model.ClientPhysique;
import com.sosnot.registry.service.exception.NotFoundException;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class ClientService {

    private static final Logger LOG = LoggerFactory.getLogger(ClientService.class);

    @Inject
    ClientPhysiqueService physiqueService;

    @Inject
    ClientMoraleService moraleService;

    public List<Client> getAllClients() {
        return Client.list("isActive", true);
    }

    /*
     * ============================
     * CLIENT PHYSIQUE DELEGATION
     * ============================
     */

    public List<ClientPhysique> getAllPhysiques() {
        return physiqueService.getAll();
    }

    @Transactional
    public UUID createPhysique(ClientPhysique client) {
        return physiqueService.create(client);
    }

    public ClientPhysique getPhysiqueById(UUID id) {
        return physiqueService.getById(id);
    }

    public ClientPhysique findPhysiqueByCin(String cin) {
        return physiqueService.findByCin(cin);
    }

    public List<ClientPhysique> autocompletePhysique(String query) {
        return physiqueService.autocomplete(query);
    }

    public boolean checkCinExists(String cin) {
        return physiqueService.checkCinExists(cin);
    }

    @Transactional
    public void updatePhysique(UUID id, ClientPhysique data) {
        physiqueService.update(id, data);
    }

    /*
     * ============================
     * CLIENT MORALE DELEGATION
     * ============================
     */

    public List<ClientMorale> getAllMorales() {
        return moraleService.findAllActifs();
    }

    @Transactional
    public UUID createMorale(ClientMorale client) {
        return moraleService.create(client);
    }

    public ClientMorale getMoraleById(UUID id) {
        return moraleService.getById(id);
    }

    public ClientMorale findMoraleByIce(String ice) {
        return moraleService.findByIce(ice);
    }

    public List<ClientMorale> autocompleteMorale(String query) {
        return moraleService.autocomplete(query);
    }

    public boolean checkIceExists(String ice) {
        return moraleService.checkIceExists(ice);
    }

    public boolean checkRcExists(String rc) {
        return moraleService.checkRcExists(rc);
    }

    public boolean checkIfExists(String identifiantFiscal) {
        return moraleService.checkIfExists(identifiantFiscal);
    }

    @Transactional
    public void updateMorale(UUID id, ClientMorale data) {
        moraleService.update(id, data);
    }

    /*
     * ============================
     * COMMUN
     * ============================
     */

    @Transactional
    public void deleteClient(UUID id) {
        LOG.info("Deleting client: {}", id);
        if (!Client.deleteById(id)) {
            throw new NotFoundException("Client introuvable");
        }
    }

    @Transactional
    public void deactivate(UUID id) {
        LOG.info("Deactivating client: {}", id);
        Client client = Client.findById(id);
        if (client == null) {
            throw new NotFoundException("Client introuvable");
        }
        client.deactivate();
    }
}