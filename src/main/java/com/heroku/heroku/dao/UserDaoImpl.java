package com.heroku.heroku.dao;

import com.heroku.heroku.models.Usuario;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@Transactional
public class UserDaoImpl implements UserDao{
    @PersistenceContext
    EntityManager entityManager;
    @Override
    public List<Usuario> getUsers() {
        String query = "FROM Usuario";
        return  entityManager.createQuery(query).getResultList();
    }

    @Override
    public Usuario getUser(long id) {
        return null;
    }

    @Override
    public void delete(long id) {
        Usuario user = entityManager.find(Usuario.class,id);
        entityManager.remove(user);
    }

    @Override
    public void register(Usuario user) {
        entityManager.merge(user);
    }

    @Override
    public Usuario getUserByCredentials(Usuario user) {
        String query = "FROM Usuario WHERE email=:email";
        List<Usuario> result = entityManager.createQuery(query)
                .setParameter("email",user.getEmail())
                .getResultList();
        if(result.isEmpty())return null;
        String password=result.get(0).getPassword();
        Argon2 argon2= Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        return argon2.verify(password,user.getPassword())?result.get(0):null;
    }
}
