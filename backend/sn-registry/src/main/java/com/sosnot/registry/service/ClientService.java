package com.sosnot.registry.service;

import com.sosnot.registry.model.Client;
import com.sosnot.registry.model.ClientMorale;
import com.sosnot.registry.model.ClientPhysique;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class ClientService {

    /* ============================
       CLIENT PHYSIQUE
       ============================ */

    @Transactional
    public UUID createPhysique(ClientPhysique client) {

        if (ClientPhysique.existsCin(client.cin)) {
            throw new IllegalStateException("CIN déjà existant");
        }

        client.persist();
        return client.id;
    }

    public ClientPhysique getPhysiqueById(UUID id) {
        return ClientPhysique.findById(id);
    }

    public ClientPhysique findPhysiqueByCin(String cin) {
        return ClientPhysique.findByCin(cin);
    }

    @Transactional
    public void updatePhysique(UUID id, ClientPhysique data) {

        ClientPhysique existing = getPhysiqueById(id);
        if (existing == null) {
            throw new IllegalStateException("Client introuvable");
        }

        // CIN IMMUTABLE
        if (!existing.cin.equals(data.cin)) {
            throw new IllegalStateException("Modification du CIN interdite");
        }

        existing.nom = data.nom;
        existing.prenom = data.prenom;
        existing.adresse = data.adresse;
        existing.telephone = data.telephone;
    }

    /* ============================
       CLIENT MORALE
       ============================ */

    @Transactional
    public UUID createMorale(ClientMorale client) {

        if (ClientMorale.findByIce(client.ice) != null) {
            throw new IllegalStateException("ICE déjà existant");
        }

        client.persist();
        return client.id;
    }

    public ClientMorale getMoraleById(UUID id) {
        return ClientMorale.findById(id);
    }

    public ClientMorale findMoraleByIce(String ice) {
        return ClientMorale.findByIce(ice);
    }

    public List<ClientMorale> searchMoraleByRaisonSociale(String rs) {
        return ClientMorale.searchByRaisonSociale(rs);
    }

    /* ============================
       COMMUN
       ============================ */

    @Transactional
    public void deactivate(UUID id) {
        Client client = Client.findById(id);
        if (client == null) {
            throw new IllegalStateException("Client introuvable");
        }
        client.deactivate();
    }
}