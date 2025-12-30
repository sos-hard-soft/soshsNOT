package com.sosnot.registry.service;

import com.sosnot.registry.model.ClientPhysique;
import com.sosnot.registry.service.exception.BusinessException;
import com.sosnot.registry.service.exception.NotFoundException;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class ClientPhysiqueService {

    private static final Logger LOG = LoggerFactory.getLogger(ClientPhysiqueService.class);

    public List<ClientPhysique> getAll() {
        return ClientPhysique.list("isActive", true);
    }

    @Transactional
    public UUID create(ClientPhysique client) {
        LOG.info("Creating new physical client: {} {}", client.prenom, client.nom);

        if (client.cin == null || client.cin.isBlank()) {
            throw new BusinessException("CIN obligatoire");
        }

        if (ClientPhysique.existsCin(client.cin)) {
            LOG.error("Attempt to create physical client with existing CIN: {}", client.cin);
            throw new BusinessException("CIN déjà existant");
        }

        if (client.adresses != null) {
            client.adresses.forEach(adresse -> adresse.client = client);
        }

        client.persist();
        LOG.info("Physical client created with ID: {}", client.id);
        return client.id;
    }

    public ClientPhysique getById(UUID id) {
        ClientPhysique client = ClientPhysique.findById(id);
        if (client == null || !client.isActive) {
            LOG.warn("Physical client not found or inactive: {}", id);
            throw new NotFoundException("Client physique introuvable");
        }
        return client;
    }

    public ClientPhysique findByCin(String cin) {
        if (cin == null || cin.isBlank()) {
            throw new BusinessException("CIN requis pour la recherche");
        }
        ClientPhysique client = ClientPhysique.findByCin(cin);
        if (client == null || !client.isActive) {
            throw new NotFoundException("Client physique introuvable");
        }
        return client;
    }

    /*
     * Autocomplete helpers for PrimeNG
     */
    public List<ClientPhysique> autocomplete(String query) {
        if (query == null || query.length() < 2) {
            return List.of();
        }
        String pattern = "%" + query.toLowerCase() + "%";
        return ClientPhysique.find(
                "isActive = true and (LOWER(cin) like ?1 or LOWER(nom) like ?1 or LOWER(prenom) like ?1)",
                pattern).list();
    }

    public boolean checkCinExists(String cin) {
        return ClientPhysique.existsCin(cin);
    }

    @Transactional
    public void update(UUID id, ClientPhysique data) {
        LOG.info("Updating physical client: {}", id);
        ClientPhysique existing = getById(id);

        if (data.cin != null && !existing.cin.equals(data.cin)) {
            throw new BusinessException("Modification du CIN interdite");
        }

        existing.nom = data.nom;
        existing.prenom = data.prenom;
        existing.nomAr = data.nomAr;
        existing.prenomAr = data.prenomAr;
        existing.telephone = data.telephone;
        existing.email = data.email;
        existing.dateNaissance = data.dateNaissance;
        existing.lieuNaissance = data.lieuNaissance;
        existing.nationalite = data.nationalite;
        existing.gender = data.gender;

        LOG.info("Physical client {} updated successfully", id);
    }

    @Transactional
    public void deactivate(UUID id) {
        LOG.info("Deactivating physical client: {}", id);
        getById(id).deactivate();
    }
}
