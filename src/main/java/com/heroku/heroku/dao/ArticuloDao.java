package com.heroku.heroku.dao;

import com.heroku.heroku.models.Articulo;

import java.util.List;

public interface ArticuloDao {
    List<Articulo> getArticulos();
    Articulo saveArticulo(Articulo articulo);
    Articulo getArticuloById(long id);
    void deleteArticulo(long id);
}
