package com.sosnot.registry.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "representant_legal")
public class RepresentantLegal extends PanacheEntityBase {

    @Id
    @GeneratedValue
    public UUID id;

    @JsonIgnore
    @ManyToOne(optional = false)
    @JoinColumn(name = "client_morale_id")
    public ClientMorale clientMorale;

    @Column(nullable = false)
    public String nom;

    @Column(nullable = false)
    public String prenom;

    @Column(nullable = false)
    public String cin;

    public String qualite;
    public LocalDate debutMandat;
    public LocalDate finMandat;
}