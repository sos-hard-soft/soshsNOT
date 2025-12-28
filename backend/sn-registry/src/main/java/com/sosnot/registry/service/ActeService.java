package com.sosnot.registry.service;

import com.sosnot.registry.dto.ActeDTO;
import com.sosnot.registry.model.*;
import com.sosnot.registry.service.exception.BusinessException;
import com.sosnot.registry.service.exception.NotFoundException;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;
import java.util.UUID;
import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class ActeService {

    private static final Logger LOG = LoggerFactory.getLogger(ActeService.class);

    public Acte getActeById(UUID id) {
        Acte acte = Acte.findById(id);
        if (acte == null) {
            LOG.warn("Acte not found with ID: {}", id);
            throw new NotFoundException("Acte introuvable");
        }
        return acte;
    }

    public List<ActeDTO> getAllActes() {
        return Acte.<Acte>listAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public ActeDTO getActeDTOById(UUID id) {
        return mapToDTO(getActeById(id));
    }

    @Transactional
    public UUID creerActe(ActeDTO dto) {
        LOG.info("Creating new acte with number: {}", dto.numeroActe);

        if (Acte.find("numeroActe", dto.numeroActe).count() > 0) {
            LOG.error("Attempt to create acte with existing number: {}", dto.numeroActe);
            throw new BusinessException("Numéro d'acte déjà existant");
        }

        Acte acte = new Acte();
        acte.numeroActe = dto.numeroActe;
        acte.type = dto.type;
        acte.dateActe = dto.dateActe;
        acte.dateReception = LocalDateTime.now();
        acte.cloture = false;
        acte.persist();

        if (dto.parties != null) {
            for (ActeDTO.PartieDTO pDto : dto.parties) {
                ajouterPartie(acte.id, pDto.clientId, pDto.qualite);
            }
        }

        LOG.info("Acte created successfully with ID: {}", acte.id);
        return acte.id;
    }

    @Transactional
    public void ajouterPartie(UUID acteId, UUID clientId, ActeQualite qualite) {
        LOG.info("Adding party to acte: {} (Client: {}, Qualite: {})", acteId, clientId, qualite);

        Acte acte = Acte.findById(acteId);
        Client client = Client.findById(clientId);

        if (acte == null) {
            throw new NotFoundException("Acte introuvable");
        }
        if (client == null) {
            throw new NotFoundException("Client introuvable");
        }

        if (acte.cloture) {
            LOG.error("Attempt to add party to closed acte: {}", acteId);
            throw new BusinessException("Acte clôturé");
        }

        ActePartie ap = new ActePartie();
        ap.acte = acte;
        ap.client = client;
        ap.qualite = qualite;
        ap.persist();

        LOG.info("Party added successfully to acte: {}", acteId);
    }

    @Transactional
    public void updateActe(UUID id, ActeDTO dto) {
        LOG.info("Updating acte: {}", id);
        Acte existing = getActeById(id);

        if (existing.cloture) {
            throw new BusinessException("Impossible de modifier un acte clôturé");
        }

        existing.numeroActe = dto.numeroActe;
        existing.type = dto.type;
        existing.dateActe = dto.dateActe;

        LOG.info("Acte {} updated successfully", id);
    }

    @Transactional
    public void deleteActe(UUID id) {
        LOG.info("Deleting acte: {}", id);
        Acte acte = getActeById(id);
        if (acte.cloture) {
            throw new BusinessException("Impossible de supprimer un acte clôturé");
        }
        acte.delete();
        LOG.info("Acte {} deleted successfully", id);
    }

    @Transactional
    public void cloturerActe(UUID acteId) {
        LOG.info("Closing acte: {}", acteId);
        Acte acte = getActeById(acteId);
        acte.cloturer();
        LOG.info("Acte {} closed", acteId);
    }

    private ActeDTO mapToDTO(Acte acte) {
        ActeDTO dto = new ActeDTO();
        dto.id = acte.id;
        dto.numeroActe = acte.numeroActe;
        dto.type = acte.type;
        dto.dateActe = acte.dateActe;
        dto.cloture = acte.cloture;
        if (acte.parties != null) {
            dto.parties = acte.parties.stream().map(p -> {
                ActeDTO.PartieDTO pdto = new ActeDTO.PartieDTO();
                pdto.clientId = p.client.id;
                if (p.client instanceof ClientPhysique cp) {
                    pdto.clientNom = cp.prenom + " " + cp.nom;
                } else if (p.client instanceof ClientMorale cm) {
                    pdto.clientNom = cm.raisonSociale;
                }
                pdto.qualite = p.qualite;
                return pdto;
            }).collect(Collectors.toList());
        }
        return dto;
    }
}