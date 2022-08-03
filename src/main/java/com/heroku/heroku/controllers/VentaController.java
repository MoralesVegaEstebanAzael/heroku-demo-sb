package com.heroku.heroku.controllers;

import com.heroku.heroku.dao.VentaDao;
import com.heroku.heroku.models.DetalleVenta;
import com.heroku.heroku.models.Venta;
import com.heroku.heroku.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequestMapping(value = "/api/ventas")
@RestController
public class VentaController {
    @Autowired
    private VentaDao ventaDao;
    @Autowired
    private JWTUtil jwtUtil;

    @RequestMapping(value = "/detalles/{folio}")
    public List<DetalleVenta> getDetalleVentaFolio(@PathVariable long folio,
                                                   @RequestHeader(value = "Authorization") String token){
        if(jwtUtil.getKey(token)==null){
            return new ArrayList<>();
        }
        return ventaDao.getDetalleByFolioVenta(folio);
    }

    @RequestMapping(value = "/detalle/{id}")
    public ResponseEntity<DetalleVenta> getDetalleById(@PathVariable("id") long idDetalle){
        return new ResponseEntity<>(ventaDao.getDetalleVentaById(idDetalle), HttpStatus.OK);
    }

    @RequestMapping(value = "/venta/{id}")
    public ResponseEntity<Venta> getVentaByFolio(@PathVariable("id") long folio){
        return new ResponseEntity<>(ventaDao.ventaByFolio(folio),HttpStatus.OK);
    }

    @RequestMapping(value = "/detalle/",method = RequestMethod.POST)
    public ResponseEntity<DetalleVenta> update(@RequestBody DetalleVenta detalleVenta){
        return new ResponseEntity<>(ventaDao.updateDetalleVenta(detalleVenta),HttpStatus.OK);
    }


    @RequestMapping(value = "/venta/",method = RequestMethod.POST)
    public ResponseEntity<Venta> saveVenta(@RequestBody Venta venta){
        return new ResponseEntity<>(ventaDao.saveVenta(venta),HttpStatus.OK);
    }

    @RequestMapping(value = "/detalle/{id}",method = RequestMethod.DELETE)
    public void delete(@PathVariable long id){
        ventaDao.deleteDetalle(id);
    }
}
