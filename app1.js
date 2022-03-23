"use strict"



function getAllUsers(){

     let userMapping = [];
   
    axios.get('http://localhost:3000/getAllUsers').then(resp => {
        
        for(let i = 0; i<resp.data.length; i++){
           
            userMapping.push({
                id : resp.data[i].id,
                username : resp.data[i].username,
                password : resp.data[i].password
            })

        } 
        
        let table = document.getElementById('myTable');

    for (let i = 0; i < userMapping.length; i++){
        
        let row = `
        <tr>
         <th scope="row">${userMapping[i].id}</th>
         <td>${userMapping[i].username}</td>
         <td>${userMapping[i].password}</td>
       </tr
        `
        table.innerHTML += row;
    }     
    })

}





window.onload = function() {
    getAllUsers();   
}


document.addEventListener("DOMContentLoaded", () => {
    const createUserButton = document.getElementById("buttonErstellen");
    const deleteUserButton = document.getElementById("buttonLoeschen");

    createUserButton.addEventListener("click", ()  => {
    let inputID = document.getElementById("userID").value;
    let inputUserName = document.getElementById("userName").value;
    let inputUserPassword = document.getElementById("userPassword").value;


     axios({
            method:'post',
            url:'http://localhost:3000/createUser',
            data: {
                userID : inputID,
                userName : inputUserName,
                password: inputUserPassword
                
            }
        })
        .then(function (response){
            console.log("THEN")
            console.log(response);
            if(response.status == 200){
                alert("Benutzer wurde erstellt!");    
                location.reload();                
            }     
        })
        .catch(function (error){
            alert("Benutzer existiert bereits!");
            console.log(error);
        })
})

deleteUserButton.addEventListener("click", () => {
    let inputID = document.getElementById("userID").value;
    let inputUserName = document.getElementById("userName").value;
    let inputUserPassword = document.getElementById("userPassword").value;
    

    axios.delete("http://localhost:3000/deleteUser",  {
        data: {
            id: inputID,
            username: inputUserName,
            password: inputUserPassword
        }
    }).then(function (response){
        console.log(response);
    
    })
    .catch(function(error){
        console.log(error);
    })
    
    })

})    