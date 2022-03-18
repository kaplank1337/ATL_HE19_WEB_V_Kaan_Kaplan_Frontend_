"use strict"

const { default: axios } = require("axios");


document.addEventListener("DOMContentLoaded", () => {

   
    const anmeldenButton = document.getElementById("anmelden");

    
    anmeldenButton.addEventListener("click", () => {
         const fieldEingabeUsername = document.getElementById("fieldEingabeUsername").value;
        const fieldEingabePassword = document.getElementById("fieldEingabePassword").value;
     
       
        axios({
            method:'post',
            url:'http://localhost:3000/login',
            data: {
                username: fieldEingabeUsername,
                password: fieldEingabePassword
                
            }
        })
        .then(function (response){
            if(response.status == 200){
                let zweiteSeite = "secondpage.html";
                window.location.href = zweiteSeite;
            }

             
        })
        .catch(function (error){
            console.log(error);
        })
    });
    





})