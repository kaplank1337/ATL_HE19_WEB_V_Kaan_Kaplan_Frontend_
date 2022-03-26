

"use strict"


let receivedTokenFromLogin;





/**
 * getAllUsers
 * Diese Funktion erhält via GET sämtliche Benutzer aus dem Backend und mappt diese in die Tabelle ein
 * Es gibt keine Parameter die man mitgibt! (VOID Methode)
 */
function getAllUsers(){


   receivedTokenFromLogin = window.localStorage.getItem('jwt-token');
    
     let userMapping = []; 
     console.log("GET REQUEST!")
     
    axios.get('http://localhost:3000/getAllUsers', {
            headers : {
                'Authorization': 'baerer ' + receivedTokenFromLogin
            }
        }).then(resp => {
            console.log("then");
        
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
})}
    


/**
 * userIDValidation
 * Dieser überprüft die Eingabe der User ID via Regex. Der String darf nur aus Zahlen von 0-9 bestehen.
 * @param {String} userID Es wird die User ID mitgegeben die im Frontend im Feld ID eingegeben und mit Erstellen oder Update bestätigt wird.
 * @returns Es handelt sich eigentlich um einen Boolean der falls der Regex matcht ein True zurück gibt und ansonsten ein False
 */
function userIDValidation(userID){
    let reg = new RegExp('^[0-9]$');
    if(reg.test(userID)){
        return true;
    }
    return false;
}

/**
 * userNameValidaton
 * Dieser überprüft die Eingabe des Benutzernamens via Regex. Bei der Überprüfung muss der Anfangsbuchstabe gross sein und der klein. Es dürfen nur Buchstaben aus dem Alphabet verwendet werden.
 * @param {String} userName Als Parameter wird der eingegebene Benutzername, die im Frontend im Feld Benutzer eingegeben wird mitgegeben.
 * @returns Hierbei handelt es sich um eine boolsche Funktion die True bei Regex Match und ansonsten ein False zurückgibt.
 */
function userNameValidation(userName){
    let reg = new RegExp('^[A-Z][a-z\-]+$');
    if(reg.test(userName)){
        return true;
    }
    return false;
}

/**
 * userPasswordValidation
 * Dieser überprüft die Eingabe des Benutzerpassworts via Regex. Das Passwort muss min. 8 Zeichen lang sein, Gross- und Kleinbuchstaben sowie ein Sonderzeichen haben.
 * @param {String} userPassword Als Parameter wird der eingegebene Benutzerpasswort, die im Frontendim Feld Passwort eingegeben wird mitgegeben.
 * @returns Hierbei handelt es sich um eine boolsche Funktion die True bei Regex Match und asonsten ein False zurückgibt.
 */
function userPasswordValidation(userPassword){
    let reg = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
    if(reg.test(userPassword)){
        return true;
    }
    return false;
}





/**
 * Diese Funktion ist in Javascript eingebaut und führt die Funktion getAllUsers aus sobald die Website mit der Javascript Datei app1.js ausgeführt wird.
 */
window.onload = function() {
    getAllUsers();   
}


document.addEventListener("DOMContentLoaded", () => {
    const createUserButton = document.getElementById("buttonErstellen");
    const deleteUserButton = document.getElementById("buttonLoeschen");
    const updateUserButton = document.getElementById("buttonUpdate");

    createUserButton.addEventListener("click", ()  => {
    let inputID = document.getElementById("userID").value;
    let inputUserName = document.getElementById("userName").value;
    let inputUserPassword = document.getElementById("userPassword").value;

    if(!userIDValidation(inputID)){
        return alert("ID hat nicht das richtige Format! (NUR ZAHLEN ERLAUBT)");
    }

    if(!userNameValidation(inputUserName)){
        return alert("Username hat nicht das richtige Format! (Erster Buchstabe gross, rest klein!)");
    }

    if(!userPasswordValidation(inputUserPassword)){
        return alert("PW = 8 Zeichen, Gross- & Kleinbuchstabe, Zahl und Sonderzeichen!");
    }

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

    if(!userIDValidation(inputID)){
        return alert("ID hat nicht das richtige Format! (NUR ZAHLEN ERLAUBT)");
    }    

    axios.delete("http://localhost:3000/deleteUser/" + inputID).then(function (response){
        console.log(response);
        location.reload();
    
    })
    .catch(function(error){
        console.log(error);
    })    
    })


updateUserButton.addEventListener("click", () => {

    let inputID = document.getElementById("userID").value;
    let inputUserName = document.getElementById("userName").value;
    let inputUserPassword = document.getElementById("userPassword").value;

    if(!userIDValidation(inputID)){
        return alert("ID hat nicht das richtige Format! (NUR ZAHLEN ERLAUBT)");
    }

    if(inputUserName == "" || inputUserPassword == ""){        
        if(inputUserName == ""){
        axios.patch("http://localhost:3000/updateUserPatch/" + inputID, 
        {
            password: inputUserPassword
        })
        .then(function (response){
            alert("Password wurde via PATCH upgedated");
            getAllUsers();
            location.reload();
        })
    }}

    if(inputUserName == "" || inputUserPassword == ""){
        if(inputUserPassword == ""){            
            if(!userNameValidation(inputUserName)){
                return alert("Username hat nicht das richtige Format! (Erster Buchstabe gross, rest klein!)");
            }

            axios.patch("http://localhost:3000/updateUserPatch/" + inputID,
            {
                username: inputUserName
            })
            .then(function (response){
                alert("Username wurde via PATCH upgedated");
                getAllUsers();
                location.reload();
            })
        }
    }

    if(inputUserName != "" && inputUserPassword != ""){        
        if(!userPasswordValidation(inputUserPassword)){
            return alert("Password hat nicht das richtige Format! (Mind. 8 Zeichen, Gross- & Kleinbuchstabe + Zahl");
        }

        axios.put("http://localhost:3000/updateUserPut/"  + inputID,
        {
            username: inputUserName, 
            password: inputUserPassword
        }).then(function (response){
            alert("Benutzer wurde via PUT upgedated!");
            getAllUsers();
            location.reload();
        })

    }
    })

    


    //PATCH EINZELNE EIGENSCHAFTEN
    //PUT Ganze Resource
    
})    