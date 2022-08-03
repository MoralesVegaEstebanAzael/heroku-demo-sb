package com.heroku.heroku.dao;

import com.heroku.heroku.models.Usuario;

import java.util.List;

public interface UserDao {
    List<Usuario> getUsers();
    Usuario getUser(long id);
    void delete(long id);
    void register(Usuario user);
    Usuario getUserByCredentials(Usuario user);
}
