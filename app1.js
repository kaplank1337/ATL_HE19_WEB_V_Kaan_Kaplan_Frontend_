"use strict"



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
    })

   
   
    
setTimeout(function() {
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
},500);
  
   
   

}
