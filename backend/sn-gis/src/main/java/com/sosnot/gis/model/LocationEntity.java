package com.sosnot.gis.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;

@Entity
public class LocationEntity extends PanacheEntity {
    public String name;
}
