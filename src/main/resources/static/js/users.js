// Call the dataTables jQuery plugin
$(document).ready(function() {
  loadUsers();
  $('#users').DataTable({  "bInfo" : false});
  getUserName();
});


function getUserName(){
    document.querySelector('#user-name').innerHTML=localStorage.userName;
    return localStorage.userName;
}
async function  loadUsers(){
    const request = await fetch('api/users', {
      method: 'GET',
      headers: getHeaders(),
    });
    const users = await request.json();
    let userHtml;
    users.forEach(user=>{
        let deleteButton=" <a  href=\"#\" onclick='deleteUser("+user.id+")' class=\"btn btn-danger btn-circle btn-sm\">\n" +
            "     <i class=\"fas fa-trash\"></i>\n" +
            " </a>";

         userHtml += " <tr>\n" +
            "<td>"+user.id+"</td>\n" +
            "<td>"+user.nombre +" </td>\n" +
            "<td>"+user.email+"</td>\n" +
            // "<td>"+user.phone+"</td>\n" +
            "<td>\n" +
             deleteButton+
            "</td>\n" +
            "</tr>";
    })


    document.querySelector('#users tbody').outerHTML=userHtml;
}


// function getHeaders(){
//     console.log(localStorage.token);
//     return  {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'Authorization':localStorage.token
//     };
// }

async function deleteUser(id){
    const request = await fetch('api/user/'+id, {
        method: 'DELETE',
        headers:getHeaders(),
    });
    loadUsers();
}
