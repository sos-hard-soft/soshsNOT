package com.sosnot.registry.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Column;

@Entity
public class Client extends PanacheEntityBase {
    @Id
    @GeneratedValue
    public Long id;

    @Column(nullable = false)
    public String firstName;

    @Column(nullable = false)
    public String lastName;

    @Column(nullable = false, unique = true)
    public String cin;

    public String email;
    public String phone;

    public static Client findByCin(String cin) {
        return find("cin", cin).firstResult();
    }

}
