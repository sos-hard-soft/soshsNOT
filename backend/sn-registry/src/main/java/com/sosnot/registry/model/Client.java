package com.sosnot.registry.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "client")
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "client_type", discriminatorType = DiscriminatorType.STRING)
public abstract class Client extends PanacheEntityBase {

   @Id
   @GeneratedValue
   @Column(columnDefinition = "uuid")
   public UUID id;

   /*
    * ===============================
    * Gouvernance des données – Loi 09-08
    * ===============================
    */

   @Column(name = "legal_basis", nullable = false, updatable = false)
   public String legalBasis = "LEGAL_OBLIGATION";

   @Column(name = "retention_policy", nullable = false)
   public String retentionPolicy = "ARCHIVAGE_30_ANS";

   @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, orphanRemoval = true)
   public List<Adresse> adresses;

   @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, orphanRemoval = true)
   public List<Document> documents;
   /*
    * ===============================
    * Audit & cycle de vie
    * ===============================
    */

   @CreationTimestamp
   @Column(name = "created_at", nullable = false, updatable = false)
   public LocalDateTime createdAt;

   @UpdateTimestamp
   @Column(name = "updated_at")
   public LocalDateTime updatedAt;

   @Column(name = "is_active", nullable = false)
   public boolean isActive = true;

   /*
    * ===============================
    * Règles métier transverses
    * ===============================
    */

   public void deactivate() {
      this.isActive = false;
   }

   public abstract String getIdentifiantLegal();
}