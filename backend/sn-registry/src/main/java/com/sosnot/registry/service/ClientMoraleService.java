package com.sosnot.registry.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import com.sosnot.registry.model.ClientMorale;
import com.sosnot.registry.service.exception.BusinessException;
import com.sosnot.registry.service.exception.NotFoundException;

import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class ClientMoraleService {

    /* =========================================================
       CRÉATION
       ========================================================= */

    @Transactional
    public UUID create(ClientMorale client) {

        validateForCreation(client);

        // Gouvernance des données (Loi 09-08)
        client.legalBasis = "Obligation légale - Acte notarié";
        client.retentionPolicy = "CLIENT_MORALE";

        client.persist();
        return client.id;
    }

    private void validateForCreation(ClientMorale client) {

        if (client == null) {
            throw new BusinessException("Client morale null");
        }

        if (client.ice == null || client.ice.isBlank()) {
            throw new BusinessException("ICE obligatoire");
        }

        if (ClientMorale.findByIce(client.ice) != null) {
            throw new BusinessException("Un client morale avec cet ICE existe déjà");
        }

        if (client.raisonSociale == null || client.raisonSociale.isBlank()) {
            throw new BusinessException("Raison sociale obligatoire");
        }

        if (client.isLotisseur) {
            validateLotisseur(client);
        }
    }

    private void validateLotisseur(ClientMorale client) {

        if (client.numeroAgrementLotisseur == null ||
                client.numeroAgrementLotisseur.isBlank()) {
            throw new BusinessException(
                    "Un lotisseur doit obligatoirement disposer d’un numéro d’agrément"
            );
        }
    }

    /* =========================================================
       CONSULTATION
       ========================================================= */

    public ClientMorale getById(UUID id) {

        ClientMorale client = ClientMorale.findById(id);

        if (client == null || !client.isActive) {
            throw new NotFoundException("Client morale introuvable ou désactivé");
        }

        return client;
    }

    public ClientMorale findByIce(String ice) {

        if (ice == null || ice.isBlank()) {
            throw new BusinessException("ICE requis pour la recherche");
        }

        ClientMorale client = ClientMorale.findByIce(ice);

        if (client == null || !client.isActive) {
            throw new NotFoundException("Client morale introuvable");
        }

        return client;
    }

    public List<ClientMorale> findAllActifs() {
        return ClientMorale.list("isActive", true);
    }

    public List<ClientMorale> findLotisseurs() {
        return ClientMorale.list("isLotisseur = true and isActive = true");
    }

    /* =========================================================
       MISE À JOUR (CONTRÔLÉE)
       ========================================================= */

    @Transactional
    public void update(UUID id, ClientMorale updates) {

        ClientMorale existing = getById(id);

        // ❌ ICE IMMUTABLE (règle juridique)
        if (updates.ice != null && !updates.ice.equals(existing.ice)) {
            throw new BusinessException("Modification de l’ICE interdite");
        }

        // Champs autorisés
        existing.raisonSociale = updates.raisonSociale;
        existing.formeJuridique = updates.formeJuridique;
        existing.rc = updates.rc;
        existing.identifiantFiscal = updates.identifiantFiscal;
        existing.siegeSocial = updates.siegeSocial;
        existing.telephone = updates.telephone;
        existing.email = updates.email;

        // Lotisseur
        if (updates.isLotisseur && !existing.isLotisseur) {
            // Passage en lotisseur
            if (updates.numeroAgrementLotisseur == null) {
                throw new BusinessException("Agrément lotisseur requis");
            }
            existing.isLotisseur = true;
            existing.numeroAgrementLotisseur = updates.numeroAgrementLotisseur;
        }

        if (!updates.isLotisseur && existing.isLotisseur) {
            // Interdit sans analyse des actes
            throw new BusinessException(
                    "La révocation du statut lotisseur nécessite une vérification des actes liés"
            );
        }
    }

    /* =========================================================
       DÉSACTIVATION (SOFT DELETE)
       ========================================================= */

    @Transactional
    public void deactivate(UUID id) {

        ClientMorale client = getById(id);

        // TODO (prochaine étape)
        // if (Acte.existsForClient(client.id)) {
        //     throw new BusinessException("Client lié à des actes notariés");
        // }

        client.deactivate();
    }

    /* =========================================================
       CONTRÔLES D’INTÉGRITÉ (FUTUR)
       ========================================================= */

    public boolean canBeDeleted(UUID id) {
        // Toujours false en notariat
        return false;
    }
}
