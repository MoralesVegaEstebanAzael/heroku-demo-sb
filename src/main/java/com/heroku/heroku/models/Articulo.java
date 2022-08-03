package com.heroku.heroku.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "articulos")
@ToString
public class Articulo {
    @Id
    @Getter
    @Setter
    @Column(name = "id_articulo")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Getter @Setter @Column(name = "descripcion")
    private String descripcion;
    @Getter @Setter @Column(name = "precio_unitario")
    private float precioUnitario;
}
