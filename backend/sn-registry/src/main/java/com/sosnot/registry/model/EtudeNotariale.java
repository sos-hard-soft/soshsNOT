package com.sosnot.registry.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "etude_notariale")
public class EtudeNotariale extends PanacheEntityBase {

    @Id
    @GeneratedValue
    public UUID id;

    @Column(nullable = false)
    public String nom;

    @Column(nullable = false)
    public String ville;

    @Column(nullable = false)
    public String notaire;
}