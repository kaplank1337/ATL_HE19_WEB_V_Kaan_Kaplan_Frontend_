"use strict"






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
                let jwttoken =  sessionStorage.setItem("jwt-token",response.data.token);
                //receivedTokenFromLogin = response.data.token;
                window.location.href = "secondpage.html";    
            }             
        })
        .catch(function (error){
            console.log(error);
        })
    });
    





})