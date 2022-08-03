package com.heroku.heroku.dao;

import com.heroku.heroku.models.Articulo;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@Transactional
public class ArticuloDaoImpl implements ArticuloDao{
    @PersistenceContext
    EntityManager entityManager;
    @Override
    public List<Articulo> getArticulos() {
        String query = "FROM Articulo";
        List<Articulo> result = entityManager.createQuery(query)
                .getResultList();
        return result;
    }

    @Override
    public Articulo saveArticulo(Articulo articulo) {
        return entityManager.merge(articulo);
    }

    @Override
    public Articulo getArticuloById(long id) {
        return entityManager.find(Articulo.class,id);
    }

    @Override
    public void deleteArticulo(long id) {
        Articulo articulo = entityManager.find(Articulo.class,id);
        entityManager.remove(articulo);
    }
}
