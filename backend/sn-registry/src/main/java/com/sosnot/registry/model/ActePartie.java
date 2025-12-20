package com.sosnot.registry.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "acte_partie")
public class ActePartie extends PanacheEntityBase {

    @Id
    @GeneratedValue
    public UUID id;

    @ManyToOne(optional = false)
    public Acte acte;

    @ManyToOne(optional = false)
    public Client client;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    public ActeQualite qualite;
}