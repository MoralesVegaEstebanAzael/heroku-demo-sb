$(document).ready(function() {

    getUserName();

    $('#articulos').DataTable({
        "bInfo" : false
    });

    loadArticulos();
});

function getUserName(){
    document.querySelector('#user-name').innerHTML=localStorage.userName;
    return localStorage.userName;
}


async function  loadArticulos(){
    const request = await fetch('api/articulos/', {
        method: 'GET',
        headers: getHeaders(),
    });
    const articulos = await request.json();
    let articulosHtml='';

    articulos.forEach(v=>{
        let idDescripcion = "descripcion_"+v.id;
        let idPrecio = "precio_"+v.id;
        let descripcion = v.descripcion;

        let deleteButton=" <a  href=\"#\" onclick='deleteArticulo("+v.id+")' class=\"btn btn-danger btn-circle btn-sm\">\n" +
            "     <i class=\"fas fa-trash\"></i>\n" +
            " </a>";

        let inputDescripcion= "<input id="+idDescripcion+" class='form-control' type='text' " +
            "onkeypress=\"return updateDescripcionArticulo(event,"+v.id+")\" value='"+descripcion+"' >";

        let inputPrecio= "<input id="+idPrecio+" class='form-control'   type=\"number\" " +
            "onkeypress=\"return updatePrecioArticulo(event,"+v.id+")\" value="+v.precioUnitario+" >";

        articulosHtml += " <tr>\n" +
            "<td>"+v.id+"</td>\n" +
            "<td>"+inputDescripcion +"</td>\n" +
            "<td>"+inputPrecio+"</td>\n" +
            " <th>"+deleteButton+"</th>"+
            "</tr>";
    });
    document.querySelector('#articulos tbody').innerHTML=articulosHtml;
}

async function  updateArticulo(articulo){
    const request = await fetch('api/articulos/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(articulo)
    });
    loadArticulos();
    alert("Guardado Correctamente")
}


async function deleteArticulo(id){
    const request = await fetch('api/articulos/'+id, {
        method: 'DELETE',
        headers:getHeaders(),
    });

    if(request.status==200){
        alert("Eliminado con Exito")
        loadArticulos();
    }else{
        alert("Ocurrio un Error al Eliminar, código de respuesta: " + request.status)
    }

}



async function updateDescripcionArticulo(e,id){
    let  key = e.which;
    if(key==13){
        let descripcion =document.getElementById("descripcion_"+id).value;
        let articulo = await  articuloById(id);
        articulo.descripcion = descripcion;
        await updateArticulo(articulo);
    }
}


async function updatePrecioArticulo(e,id){
    let  key = e.which;
    if(key==13){
        let precio =document.getElementById("precio_"+id).value;
        if(Number(precio)>0){
            let articulo = await articuloById(id);
            articulo.precio = precio;
            await updateArticulo(articulo);
        }
    }
}



async function articuloById(id){
    const request = await fetch('api/articulos/find/'+id, {
        method: 'GET',
        headers: getHeaders(),
    });
    const articulo = await request.json();
    return articulo;
}


async function saveArticulo(){
    let descripcion = document.getElementById("txtDescripcion").value;
    let precio = document.getElementById("txtPrecioUnitario").value;

    if(descripcion==""|| Number(precio)<=0){
        alert("Ingresa los campos correctamente")
        return;
    }

    let articulo={
        descripcion : descripcion,
        precioUnitario:precio
    }

    await  updateArticulo(articulo);
    $('#articulosModal').modal('hide');

}