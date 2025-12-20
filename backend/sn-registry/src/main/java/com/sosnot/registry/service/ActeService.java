package com.sosnot.registry.service;

import com.sosnot.registry.model.*;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@ApplicationScoped
public class ActeService {

    @Transactional
    public UUID creerActe(Acte acte) {

        if (Acte.find("numeroActe", acte.numeroActe).count() > 0) {
            throw new IllegalStateException("Numéro d'acte déjà existant");
        }

        acte.dateReception = LocalDateTime.now();
        acte.persist();

        return acte.id;
    }

    @Transactional
    public void ajouterPartie(UUID acteId, UUID clientId, ActeQualite qualite) {

        Acte acte = Acte.findById(acteId);
        Client client = Client.findById(clientId);

        if (acte == null || client == null) {
            throw new IllegalStateException("Acte ou client introuvable");
        }

        if (acte.cloture) {
            throw new IllegalStateException("Acte clôturé");
        }

        ActePartie ap = new ActePartie();
        ap.acte = acte;
        ap.client = client;
        ap.qualite = qualite;
        ap.persist();
    }

    @Transactional
    public void cloturerActe(UUID acteId) {
        Acte acte = Acte.findById(acteId);
        if (acte == null) {
            throw new IllegalStateException("Acte introuvable");
        }
        acte.cloturer();
    }
}