package com.sosnot.registry.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "client_morale", uniqueConstraints = @UniqueConstraint(columnNames = "ice"))
@DiscriminatorValue("client_morale")
public class ClientMorale extends Client {

    @Column(nullable = false, length = 30)
    public String ice;

    @Column(nullable = false)
    public String raisonSociale;

    public String formeJuridique;
    public String rc;
    public String identifiantFiscal;

    public String siegeSocial;
    public String telephone;
    public String email;

    /*
     * ===============================
     * Lotisseur
     * ===============================
     */

    @Column(name = "is_lotisseur", nullable = false)
    public boolean isLotisseur = false;

    @Column(name = "numero_agrement_lotisseur")
    public String numeroAgrementLotisseur;

    /*
     * ===============================
     * Relations
     * ===============================
     */

    @OneToMany(mappedBy = "clientMorale", cascade = CascadeType.ALL, orphanRemoval = true)
    public List<RepresentantLegal> representants;

    /*
     * ===============================
     * Méthodes Panache métier
     * ===============================
     */

    public static ClientMorale findByIce(String ice) {
        return find("ice", ice).firstResult();
    }

    /* ===== Panache Queries ===== */

    public static java.util.List<ClientMorale> searchByRaisonSociale(String rs) {
        return list("LOWER(raisonSociale) like ?1 and isActive = true",
                "%" + rs.toLowerCase() + "%");
    }

    public static List<ClientMorale> findLotisseurs() {
        return list("isLotisseur", true);
    }

    @Override
    public String getIdentifiantLegal() {
        return ice;
    }
}