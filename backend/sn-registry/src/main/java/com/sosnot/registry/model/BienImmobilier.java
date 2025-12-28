package com.sosnot.registry.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.UUID;

@Entity
@Table(name = "bien_immobilier")
public class BienImmobilier extends PanacheEntityBase {

    @Id
    @GeneratedValue
    public UUID id;

    @JsonIgnore
    @ManyToOne(optional = false)
    public Acte acte;

    // --- Identification foncière marocaine ---
    @Column(nullable = false)
    public String titreFoncier;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    public TypeBien type;

    public Double superficie;

    // --- Référence GIS ---
    @Column(nullable = false, unique = true)
    public UUID geoRefId; // ID du microservice sn-gis

    // Snapshot légal (lisible hors GIS)
    public String adresseTextuelle;
}