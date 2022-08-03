package com.heroku.heroku.dao;

import com.heroku.heroku.models.DetalleVenta;
import com.heroku.heroku.models.Venta;

import java.util.List;

public interface VentaDao {
    List<DetalleVenta> getDetalleByFolioVenta(long folioVenta);
    DetalleVenta getDetalleVentaById(long id);
    DetalleVenta updateDetalleVenta(DetalleVenta detalleVenta);
    void deleteDetalle(long id);
    Venta saveVenta(Venta venta);
    Venta ventaByFolio(long folioVenta);
}
