package com.heroku.heroku.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "ventas")
@ToString
public class Venta {
    @Id
    @Getter
    @Setter
    @Column(name = "folio_venta")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long folioVenta;
    @Getter @Setter @Column(name = "total_productos")
    private int totalProductos;
    @Getter @Setter @Column(name = "total_venta")
    private float totalVenta;
}
