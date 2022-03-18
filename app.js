"use strict"


document.addEventListener("DOMContentLoaded", () => {

    
    const buttonActivate = document.getElementById("activate");
    const buttonDeactivate = document.getElementById("deactivate");
    

    
    buttonActivate.addEventListener("click", () => {
        const fieldEingabeHostname = document.getElementById("fieldEingabeHostname").value;
       
        axios({
            method:'post',
            url:'http://localhost:8080/hostname/activate',
            data: {
                hostname: fieldEingabeHostname
            }
        })
        .then(function (response){
            alert("Host " + fieldEingabeHostname + " wurde aktiviert!");
        })
        .catch(function (error){
            console.log(error);
        })
    });

     buttonDeactivate.addEventListener("click", () => {
        const fieldEingabeHostname = document.getElementById("fieldEingabeHostname").value;
        

        axios({
            method:'post',
            url:'http://localhost:8080/hostname/deactivate',
            data: {
                hostname: fieldEingabeHostname
            }
        })
        .then(function (response){
            alert("Host " + fieldEingabeHostname + " wurde deaktiviert!");
        })
        .catch(function (error){
            console.log(error);
        })
    });

     
    // Kopie an mich (Absender) einrichten.


})