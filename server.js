const express = require("express");

const app = express();

const data = require("./data.json");
 
app.use(express.json()); // Aqui diz para o express responsavel do nosso servidor usar o ficheiro JSON

// objectivo, entidade, relações com outras entidades - resource

// Verbos HTTP
// GET - receber dados de um resource
// POST - Enviar dados ou informações para serem processados poe um reosurce
// PUT  - Actualizar dados de um resource
// DELETE - Deletar dados de um Resource


app.get("/clients", function(request, response) {
  response.json(data);
});


app.get("/clients/:id", function(req, res) {
    const { id } = req.params;
    const client = data.find(cli => cli.id == id);

    if(!client) return res.status(204).json();

    res.json(client);
  });


app.post('/clients/', function(request, response){

    const {name, email} = request.body;

    // salvar

    response.json({name, email})


});


app.put('/clients/:id', function(request, response){

    const { id } = request.params;
    const client = data.find(cli => cli.id == id);
  
    if (!client) return response.status(204).json();
  
    const { name } = request.body;
  
    client.name = name;
  
    response.json(client);
});



app.delete('/clients/:id', function(request, response){

    const { id } = request.params;
    const clientsFiltered = data.filter(client => client.id != id);
  
    response.json(clientsFiltered);
});


app.listen(3000, function(){

    console.log("Server ins running");
})