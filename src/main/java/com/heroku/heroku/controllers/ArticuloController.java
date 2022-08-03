package com.heroku.heroku.controllers;

import com.heroku.heroku.dao.ArticuloDao;
import com.heroku.heroku.models.Articulo;
import com.heroku.heroku.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequestMapping(value = "/api/articulos")
@RestController
public class ArticuloController {
    @Autowired
    private ArticuloDao articuloDao;
    @Autowired
    private JWTUtil jwtUtil;

    @RequestMapping(value = "/")
    public List<Articulo> getArticulo(@RequestHeader(value = "Authorization") String token){
        if(jwtUtil.getKey(token)==null){
            return new ArrayList<>();
        }
        return articuloDao.getArticulos();
    }

    @RequestMapping(value = "/",method = RequestMethod.POST)
    public ResponseEntity<Articulo> save(@RequestBody Articulo articulo){
        return new ResponseEntity<>(articuloDao.saveArticulo(articulo), HttpStatus.OK);
    }

    @RequestMapping(value = "/find/{id}",method = RequestMethod.GET)
    public ResponseEntity<Articulo> find(@PathVariable long id){
        return new ResponseEntity<>(articuloDao.getArticuloById(id), HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}",method = RequestMethod.DELETE)
    public void delete(@PathVariable long id){
        articuloDao.deleteArticulo(id);
    }
}
