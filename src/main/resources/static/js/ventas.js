var NameSpaceVenta={
    folioVenta:0,
    detalles:[],
    venta:{},
}


$(document).ready(function() {

  getUserName();
  $('#ventas').DataTable({
      "bInfo" : false
  });

    $('#articulos').DataTable({
        "bInfo" : false
    });
});


function getUserName(){
    document.querySelector('#user-name').innerHTML=localStorage.userName;
    return localStorage.userName;
}

async function  loadVentas(){
    let id = document.getElementById("input-folio-venta").value;
    if(id=="")id=0;
    let venta = await ventaByFolio(id);
    NameSpaceVenta.folioVenta=id;
    if(venta==undefined){
        alert("La venta no se encontro")
        NameSpaceVenta.folioVenta=0;
        NameSpaceVenta.venta={};
        return;
    }

    NameSpaceVenta.venta=venta;
    NameSpaceVenta.folioVenta=venta.folioVenta;

    const request = await fetch('api/ventas/detalles/'+id, {
      method: 'GET',
      headers: getHeaders(),
    });
    const ventas = await request.json();
    let ventasHtml='';
    let consecutivo=1;
    let totalVenta=0;
    let cantidadVenta=0;
    NameSpaceVenta.detalles=[];

    ventas.forEach(v=>{
        NameSpaceVenta.detalles.push(v);
        let deleteButton=" <a  href=\"#\" onclick='deleteDetalle("+v.id+")' class=\"btn btn-danger btn-circle btn-sm\">\n" +
            "     <i class=\"fas fa-trash\"></i>\n" +
            " </a>";
        let id = "cantidad_"+v.id;
        let inputCantidad= "<input id="+id+" class='form-control'  style=\"width: 80px\"  type=\"number\" onkeypress=\"return updateCantidadDetalle(event,"+v.id+")\" value="+v.cantidad+" >";
        ventasHtml += " <tr>\n" +
            "<td>"+consecutivo+"</td>\n" +
            "<td>"+v.articulo.descripcion +"</td>\n" +
            " <th>"+inputCantidad+"</th>"+
            "<td>"+v.articulo.precioUnitario+"</td>\n" +
            "<td>"+v.total+"</td>\n" +
             "<td>\n" +
             deleteButton+
             "</td>\n" +
            "</tr>";
         consecutivo++;
         totalVenta+=v.total;
         cantidadVenta+=v.cantidad;
    });
    document.querySelector('#ventas tbody').innerHTML=ventasHtml;
    document.querySelector('#cantidad-venta').innerHTML=cantidadVenta;
    document.querySelector('#total-venta').innerHTML=totalVenta;
}


async function detalleById(id){
    const request = await fetch('api/ventas/detalle/'+id, {
        method: 'GET',
        headers: getHeaders(),
    });
    const detalle = await request.json();
    return detalle;
}


function isEmpty(obj) {
    for(var prop in obj) {
        if(Object.prototype.hasOwnProperty.call(obj, prop)) {
            return false;
        }
    }

    return JSON.stringify(obj) === JSON.stringify({});
}

async function ventaByFolio(folio){
    const request = await fetch('api/ventas/venta/'+folio, {
        method: 'GET',
        headers: getHeaders(),
    });

    let clone = request.clone();
    let txt = await request.text();
    if(txt.length){
        return  await clone.json();
    }
    return undefined;
}


async function updateCantidadDetalle(e,id){
    let  key = e.which;
    if(key==13){
        e.preventDefault();
        let cantidad =document.getElementById("cantidad_"+id).value;
        if(cantidad>0){
            const detalle = await detalleById(id);
            detalle.cantidad=cantidad;
            detalle.total = cantidad * detalle.articulo.precioUnitario;
            await updateDetalleVenta(detalle);
        }
    }
}


async function  updateDetalleVenta(detalle){
    console.log("detalle: " + JSON.stringify(detalle))
    const request = await fetch('api/ventas/detalle/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(detalle)
    });
    loadVentas();
    alert("Guardado Correctamente")
}

async function deleteDetalle(id){
    const request = await fetch('api/ventas/detalle/'+id, {
        method: 'DELETE',
        headers:getHeaders(),
    });
    alert("Eliminado con Exito")
    loadVentas();
}





async function  loadArticulo(){
    const request = await fetch('api/articulos/', {
        method: 'GET',
        headers: getHeaders(),
    });
    const articulos = await request.json();
    let articulosHtml='';

    articulos.forEach(v=>{

        let addButton=" <a  href=\"#\" onclick='addArticulo("+JSON.stringify(v)+")' class=\"btn btn-success btn-circle btn-sm\">\n" +
            "     <i class=\"fas fa-plus\"></i>\n" +
            " </a>";
        let id = "articulo_"+v.id;
        let inputCantidad= "<input id="+id+" class='form-control'  style=\"width: 80px\"  type=\"number\"  value=0 >";

        articulosHtml += " <tr>\n" +
            "<td>"+v.id+"</td>\n" +
            "<td>"+v.descripcion +"</td>\n" +
            "<td>"+v.precioUnitario+"</td>\n" +
            " <th>"+inputCantidad+"</th>"+
            "<td>\n" +
            addButton+
            "</td>\n" +
            "</tr>";
    });
    document.querySelector('#articulos tbody').innerHTML=articulosHtml;
}


async function addArticulo(articulo){
    let cantidad = document.getElementById("articulo_"+articulo.id).value;
    if(Number(cantidad)<=0){
        alert("Ingresa un cantidad correcta")
        return;
    }
    articulo.cantidad=cantidad;
    if(NameSpaceVenta.folioVenta!=0){
        addDetalle(articulo);
    }else{
        let v = {
            totalProductos:0,
            totalVenta:0
        };
        let venta = await saveVenta(v);
        document.getElementById("input-folio-venta").value = venta.folioVenta;
        NameSpaceVenta.folioVenta = venta.folioVenta;
        NameSpaceVenta.venta =venta;
        await addArticulo(articulo);
    }
}



function getIndexElementByIdArticulo(id){
    let index = NameSpaceVenta.detalles.findIndex((v => v.articulo.id === id));
    return index;
}

async function addDetalle(articulo){
    let index = getIndexElementByIdArticulo(articulo.id);
    let total = articulo.cantidad * articulo.precioUnitario;
    let detalle;

    if(index!=-1){
        detalle = NameSpaceVenta.detalles[index];
        detalle.total =total;
        detalle.cantidad=articulo.cantidad;
    }else{
        detalle = elementoDetalle(0,articulo.cantidad,total,articulo);
    }

    await updateDetalleVenta(detalle);
    $('#articulosModal').modal('hide');
}


function elementoDetalle(id,cantidad,total,articulo){
    return {
        // id:id,
        venta:NameSpaceVenta.venta,
        articulo:articulo,
        cantidad:cantidad,
        total:total,
    };
}


async function  saveVenta(venta){
    const request = await fetch('api/ventas/venta/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(venta)
    });
    const  v = await request.json();
    return v;
}






