function findById(){
    id = document.getElementById('txtId').value;               
    
    fetch('http://localhost:8080/contacts/' + id)
    .then(response => response.json())
    .then(data => {        
        if(data.name != null){
            document.getElementById("txtNome").value = data.name;
            document.getElementById("email").value = data.email;
            document.getElementById("celular").value = data.phone;
        
            document.getElementById("btnAlterar").disabled = false; 
            document.getElementById("btnExcluir").disabled = false;
            console.log(data)
        }
    });
    document.getElementById("tabelaListar").innerHTML = "";    
}  

function listar(){
    var txt = ""; 
    fetch('http://localhost:8080/contacts/')
    .then(response => response.json()) //  <th> </th>
    .then(data => {

        txt += "<br><div class='container'><table class='table table-striped'> <thead class='thead-dark'><tr><th> Registro </th><th>Nome</th><th>Email</th><th>Celular</th></tr></thead>"
        for (x in data) {
            txt += "<tr><td>" + data[x].id + "</td><td>" + data[x].name + 
                  "</td><td>" + data[x].email + "</td><td>" + data[x].phone + "</td></tr>";
        }
        txt += "</table> </div>"    
        document.getElementById("tabelaListar").innerHTML = txt;

        console.log(data)
    });         
    limpar();
    document.getElementById("btnAlterar").disabled = true; 
    document.getElementById("btnExcluir").disabled = true; 
}  

function deleteById(){
    id = document.getElementById('txtId').value;

    fetch('http://localhost:8080/contacts/' + id, {
        method: 'DELETE',
    })
    .then(response => response.json()) // or res.text()
    .then(res => console.log(res));

    document.getElementById("tabelaListar").innerHTML = "";
    document.getElementById("btnAlterar").disabled = true; 
    document.getElementById("btnExcluir").disabled = true; 
         
}

function inserir(){
    if(verificaPreenchimento()){
        const someData = {
            name: document.getElementById('txtNome').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('celular').value
        }
    
        const postMethod = {
            method: 'POST', // Method itself
            headers: {
             'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
            },
            body: JSON.stringify(someData) // We send data in JSON format
           }
    
        fetch('http://localhost:8080/contacts', postMethod)
        .then(response => response.json())
        .then(data => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
        .catch(err => console.log(err))
    }else{
        alert("Preenchimento incorreto");
    }
    document.getElementById("tabelaListar").innerHTML = "";
    document.getElementById("btnAlterar").disabled = true; 
    document.getElementById("btnExcluir").disabled = true;  
    limpar();   
}

function alterar(){
    id = document.getElementById('txtId').value;

    const someData = {
        name: document.getElementById('txtNome').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('celular').value
    }

    const putMethod = {
        method: 'PUT', // Method itself
        headers: {
         'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
        },
        body: JSON.stringify(someData) // We send data in JSON format
       }

    fetch('http://localhost:8080/contacts/' + id, putMethod)
    .then(response => response.json())
    .then(data => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
    .catch(err => console.log(err))

    document.getElementById("tabelaListar").innerHTML = "";
    document.getElementById("btnAlterar").disabled = true; 
    document.getElementById("btnExcluir").disabled = true;       
}

function limpar(){
    document.getElementById("txtId").value = "";
    document.getElementById("txtNome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("celular").value = "";
}

function verificaPreenchimento(){
    var name = document.getElementById("txtNome").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("celular").value;

    if(name == "" ||  email == "" || phone == ""){
        return false;
    } else{
        return true;
    }
}