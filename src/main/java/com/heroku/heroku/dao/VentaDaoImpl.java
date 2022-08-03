package com.heroku.heroku.dao;

import com.heroku.heroku.models.DetalleVenta;
import com.heroku.heroku.models.Venta;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@Transactional
public class VentaDaoImpl implements VentaDao{
    @PersistenceContext
    EntityManager entityManager;
    @Override
    public List<DetalleVenta> getDetalleByFolioVenta(long folioVenta) {
        String query = "FROM DetalleVenta WHERE folio_venta=:folioVenta";
        List<DetalleVenta> result = entityManager.createQuery(query)
                .setParameter("folioVenta",folioVenta)
                .getResultList();
        return result;
    }

    @Override
    public DetalleVenta getDetalleVentaById(long id) {
        String query = "FROM DetalleVenta WHERE id=:id";
        List<DetalleVenta> result = entityManager.createQuery(query)
                .setParameter("id",id)
                .getResultList();
        if(result.isEmpty())return null;
        return result.get(0);
    }

    @Override
    public DetalleVenta updateDetalleVenta(DetalleVenta detalleVenta) {
        entityManager.merge(detalleVenta);
        updateVenta(detalleVenta.getVenta().getFolioVenta());
        return detalleVenta;
    }

    @Override
    public void deleteDetalle(long id) {
        DetalleVenta detalleVenta = entityManager.find(DetalleVenta.class,id);
        entityManager.remove(detalleVenta);
        updateVenta(detalleVenta.getVenta().getFolioVenta());
    }

    @Override
    public Venta saveVenta(Venta venta) {
        return entityManager.merge(venta);
    }

    @Override
    public Venta ventaByFolio(long folioVenta) {
        return entityManager.find(Venta.class,folioVenta);
    }

    public Venta updateVenta(long folioVenta){
        Venta venta = entityManager.find(Venta.class,folioVenta);
        if(venta==null) return null;
        List<DetalleVenta> detalleVentas = getDetalleByFolioVenta(folioVenta);
        int cantidad =detalleVentas.stream()
                .mapToInt(d->d.getCantidad())
                .sum();
        double totalVenta = detalleVentas.stream()
                .mapToDouble(d->d.getTotal())
                .sum();
        venta.setTotalVenta((float)totalVenta);
        venta.setTotalProductos(cantidad);
        return venta;
    }
}
