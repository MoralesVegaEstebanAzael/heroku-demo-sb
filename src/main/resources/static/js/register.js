// Call the dataTables jQuery plugin
$(document).ready(function() {

});


async function  registerUser(){
    let passwordConfirm = document.getElementById("txtPasswordConfirm").value;
    let user={
        nombre:document.getElementById("txtName").value,
        email:document.getElementById("txtEmail").value,
        password:document.getElementById("txtPassword").value,
    };

    if(user.nombre==""||user.email==""||user.password==""){
        alert("Ingresa los campos correctamente");
        return;
    }

    if(user.password!=passwordConfirm){
        alert("Las contraseñas no coinciden");
        return;
    }

    const request = await fetch('api/user', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(user)
    });
    alert("Registrado Correctamente")
    window.location.href="index.html"
}