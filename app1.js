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
    const updateUserButton = document.getElementById("buttonUpdate");

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

    console.log("UPDATE BUTTON WURDE ANGEKLICKT!")


    if(inputUserName == "" || inputUserPassword == ""){
        console.log("Username oder PW sind leer")
        if(inputUserName == ""){
        axios.patch("http://localhost:3000/updateUserPatch/" + inputID, 
        {
            password: inputUserPassword
        })}
    }

    if(inputUserName == "" || inputUserPassword == ""){
        if(inputUserPassword == ""){
            axios.patch("http://localhost:3000/updateUserPatch/" + inputID,
            {
                username: inputUserName
            })
        }
    }

    if(inputUserName != "" && inputUserPassword != ""){
        axios.put("http://localhost:3000/updateUserPut/"  + inputID,
        {
            username: inputUserName,
            password: inputUserPassword
        })
    }

    


    //PATCH EINZELNE EIGENSCHAFTEN
    //PUT Ganze Resource
    
})    

})    