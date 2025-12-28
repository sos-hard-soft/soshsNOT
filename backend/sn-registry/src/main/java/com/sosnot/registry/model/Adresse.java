package com.sosnot.registry.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.UUID;

@Entity
@Table(name = "adresse")
public class Adresse extends PanacheEntityBase {

    @Id
    @GeneratedValue
    @Column(columnDefinition = "uuid")
    public UUID id;

    @Column(name = "adresse", nullable = false)
    public String adresse;

    @Column(name = "ville")
    public String ville;

    @Column(name = "pays")
    public String pays;

    @Column(name = "code_postal")
    public int codePostal;

    @Column(name = "principal")
    public boolean principal = false;

    @JsonIgnore
    @ManyToOne(optional = false)
    public Client client;

    // Remove abstract method or implement it
    public String getFullAdresse() {
        return adresse + ", " + ville + ", " + pays;
    }
}