package com.heroku.heroku.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "detalle_venta")
@ToString
public class DetalleVenta {
    @Id
    @Getter
    @Setter
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Getter @Setter
    @ManyToOne
    @JoinColumn(name = "folio_venta")
    private Venta venta;
    @Getter @Setter
    @ManyToOne
    @JoinColumn(name = "id_articulo")
    private Articulo articulo;
    @Getter @Setter @Column(name = "cantidad")
    private int cantidad;
    @Getter @Setter @Column(name = "total")
    private float total;
}
