let NameSpaceVenta={
    folioVenta:0,
    detalles:[],
};


$(document).ready(function() {
    loadVentas(1);
    getUserName();
    $('#ventas').DataTable({
        "bInfo" : false
    });
});


