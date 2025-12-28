package com.sosnot.registry.dto;

import com.sosnot.registry.model.ActeType;
import com.sosnot.registry.model.ActeQualite;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public class ActeDTO {
    public UUID id;
    public String numeroActe;
    public ActeType type;
    public LocalDate dateActe;
    public boolean cloture;
    public List<PartieDTO> parties;

    public static class PartieDTO {
        public UUID clientId;
        public String clientNom; // For display
        public ActeQualite qualite;
    }
}
