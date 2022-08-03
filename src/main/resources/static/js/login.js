// Call the dataTables jQuery plugin
$(document).ready(function() {

});


async function  login(){
    let user={
        email:document.getElementById("txtEmail").value,
        password:document.getElementById("txtPassword").value,
    };


    const request = await fetch('auth/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(user)
    });
    const response = await  request.text();

    if(response!="FAIL"){
        localStorage.token = response;
        localStorage.userName=user.email;
        localStorage.email = user.email;
        window.location.href="ventas.html"
    }else
        alert("Credenciales Incorrectas")

}