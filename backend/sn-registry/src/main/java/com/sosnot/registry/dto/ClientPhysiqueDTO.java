package com.sosnot.registry.dto;

import java.time.LocalDate;
import java.util.UUID;

public class ClientPhysiqueDTO {
    public UUID id;
    public String cin;
    public String nom;
    public String prenom;
    public String nomAr;
    public String prenomAr;
    public LocalDate dateNaissance;
    public String lieuNaissance;
    public String nationalite;
    public String adresse;
    public String telephone;
    public String email;
}