package com.sosnot.registry.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;

@Entity
public class ExampleEntity extends PanacheEntityBase {
    @Id
    @GeneratedValue
    public Long id;
    
    public String name;
}
