"use strict"

const { default: axios } = require("axios");

const createUserButton = document.getElementById("benutzerErstellen");



window.onload = function() {
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



createUserButton.addEventListener("click", ()  => {
    let fieldEingabeID = document.getElementById(userID).value;
    let fieldEingabeUserName = document.getElementById(userName).value;
    let fieldEingabePassword = document.getElementById(userPassword).value;



     axios({
            method:'post',
            url:'http://localhost:3000/createUserser',
            data: {
                userID : fieldEingabeID,
                userName : fieldEingabeUsername,
                password: fieldEingabePassword
                
            }
        })
        .then(function (response){
            if(response.status == 200){
                alert("Benutzer wurde erstellt!");    
            }             
        })
        .catch(function (error){
            console.log(error);
        })

})


