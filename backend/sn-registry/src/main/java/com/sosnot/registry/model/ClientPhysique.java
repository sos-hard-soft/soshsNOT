package com.sosnot.registry.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "client_physique", uniqueConstraints = @UniqueConstraint(columnNames = "cin"))
@DiscriminatorValue("client_physique")
public class ClientPhysique extends Client {

    @Column(nullable = false, length = 20)
    public String cin;

    @Column(nullable = false, length = 100)
    public String nom;

    @Column(nullable = false, length = 100)
    public String prenom;

    public String nomAr;
    public String prenomAr;


    public LocalDate dateNaissance;
    public String lieuNaissance;

    public String nationalite = "Marocaine";

    public String telephone;
    public String email;

    /*
     * ===============================
     * Méthodes Panache métier
     * ===============================
     */

    public static ClientPhysique findByCin(String cin) {
        return find("cin", cin).firstResult();
    }

    public static boolean existsCin(String cin) {
        return count("cin = ?1", cin) > 0;
    }

    @Override
    public String getIdentifiantLegal() {
        return cin;
    }
}