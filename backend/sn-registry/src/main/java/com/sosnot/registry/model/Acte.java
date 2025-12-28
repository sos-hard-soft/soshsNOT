package com.sosnot.registry.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "acte", uniqueConstraints = @UniqueConstraint(columnNames = "numeroActe"))
public class Acte extends PanacheEntityBase {

    @Id
    @GeneratedValue
    public UUID id;

    @Column(nullable = false, unique = true)
    public String numeroActe;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    public ActeType type;

    @Column(nullable = false)
    public LocalDate dateActe;

    @Column(nullable = false)
    public LocalDateTime dateReception;

    @ManyToOne(optional = true)
    public EtudeNotariale etude;

    @OneToMany(mappedBy = "acte", cascade = CascadeType.ALL, orphanRemoval = true)
    public List<ActePartie> parties;

    @OneToMany(mappedBy = "acte", cascade = CascadeType.ALL)
    public List<BienImmobilier> biens;

    @Column(nullable = false)
    public boolean cloture = false;

    public void cloturer() {
        this.cloture = true;
    }
}
