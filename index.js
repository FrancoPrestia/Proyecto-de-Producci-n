var express = require('express'); //Tipo de servidor: Express
var bodyParser = require('body-parser'); //Convierte los JSON

const {realizarQuery} = require('./modulos/mysql.js')

var app = express(); //Inicializo express
var port = process.env.PORT || 3000; //Ejecuto el servidor en el puerto 3000

// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.status(200).send({
        message: 'GET Home route working fine!'
    });
});

/**
 * req = request. en este objeto voy a tener todo lo que reciba del cliente
 * res = response. Voy a responderle al cliente
 */
app.get('/saludo', function(req,res){
    console.log(req.query) //Los pedidos get reciben los datos del req.query
    res.send(`Hola ${req.query.nombre}, que tal?`)
})

app.get('/cancha', function(req,res){
    console.log(req.query) //Los pedidos get reciben los datos del req.query
   
    let equipos = realizarQuery("select * from cancha");
    res.send(cancha);
})

app.get('/jugadores', function(req,res){
    console.log(req.query) //Los pedidos get reciben los datos del req.query
   
    let equipos = realizarQuery("select * from jugadores");
    res.send(jugadores);
})

app.get('/equipos', function(req,res){
    console.log(req.query) //Los pedidos get reciben los datos del req.query
   
    let equipos = realizarQuery("select * from 0");
    res.send(equipos);
})

app.post('/nombreDelPedido', function(req,res) {
    console.log(req.body) //Los pedidos post reciben los datos del req.body
    res.send("ok")
})

//Pongo el servidor a escuchar
app.listen(port, function(){
    console.log(`Server running in http://localhost:${port}`);
    console.log('Defined routes:');
    console.log('   [GET] http://localhost:3000/');
    console.log('   [GET] http://localhost:3000/saludo');
    console.log('   [POST] http://localhost:3000/nombreDelPedido');
});

//pedido get

app.get('/mostrarconferencias', async function(req,res){
    console.log(req.query) //Los pedidos get reciben los datos del req.query
    const respuesta = await realizarQuery(`
    SELECT * FROM Conferencias;
    `)
    console.log(respuesta)
    res.send(respuesta)
})

app.get('/mostrarligas', async function(req,res){
    console.log(req.query) //Los pedidos get reciben los datos del req.query
    const respuesta = await realizarQuery(`
    SELECT * FROM Ligas;
    `)
    console.log({respuesta})
    res.send(respuesta)
})

app.get('/mostrarclubes', async function(req,res){
    console.log(req.query) //Los pedidos get reciben los datos del req.query
    const respuesta = await realizarQuery(`
    SELECT * FROM Clubes;
    `)
    console.log({respuesta})
    res.send(respuesta)
})

//pedido post 

app.post('/insertarConferencia', async function(req,res) {
    console.log(req.body)
    const conferencias = await realizarQuery("SELECT Nombre_conferencia FROM Conferencias")
    var cumplio = false;
    for(var i =0;i<conferencias.length;i++){
        if(conferencias[i].Nombre_conferencia==req.body.Nombre_conferencia) {
            cumplio = true
        }
    }
    if(cumplio){
        res.send("Ya existia esta conferencia")
    }else{
    const respuesta = await realizarQuery(`
    INSERT INTO Conferencias  (Cantidad_paises,Presidente,Vicepresidente,Competencias_Internacionales,Continente,Nombre_conferencia,ID_Conferencia)
    VALUES('${req.body.Nombre_conferencia}','${req.body.Cantidad_paises}', '${req.body.Presidente}', '${req.body.Vicepresidente}','${req.body.Competencias_Internacionales}', '${req.body.Continente}', '${req.body.ID_Conferencia}')`)
    console.log({respuesta})
    res.send("ok")}
})

app.post('/insertarClubes', async function(req,res){
    console.log(req.body)
    const clubes = await realizarQuery("SELECT Nombre_club FROM Clubes")
    var cumplio = false;
    for(var i =0;i<clubes.length;i++){
        if(clubes[i].Nombre_club==req.body.Nombre_club) {
            cumplio = true
        }
    }
    if(cumplio){
        res.send("Ya existia este club")
    }else{
        const respuesta = await realizarQuery(`INSERT INTO Clubes (ID_Club,Cantidad_Jugadores,Cantidad_titulos,Presidente,Vicepresidente,Maximo_goleador,Nombre_club,Id_Liga)
        VALUES('${req.body.ID_Club}','${req.body.Cantidad_Jugadores
        }', '${req.body.Cantidad_titulos}', '${req.body.Presidente}','${req.body.Vicepresidente}', '${req.body.Maximo_goleador}', '${req.body.Nombre_club}','${req.body.ID_Liga}')`)
        console.log({respuesta})
        res.send("ok")
    }
})

app.post('/insertarLigas', async function(req,res) {
    console.log(req.body)
    const ligas = await realizarQuery("SELECT Nombre_liga FROM Ligas")
    var cumplio = false;
    for(var i =0;i<ligas.length;i++){
        if(ligas[i].Nombre_liga==req.body.Nombre_liga) {
            cumplio = true
        }
    }
    if(cumplio){
        res.send("Ya existia esta liga")
    }else{
    const respuesta = await realizarQuery(`
    INSERT INTO Ligas (Nombre_liga,Categoria,Campeon_Vigente,Cantidad_Equipos,Descensos,Maximo_goleador,ID_Liga,ID_Conferencia)
    VALUES('${req.body.Nombre_liga}',${req.body.Categoria}, '${req.body.Campeon_Vigente}','${req.body.Cantidad_Equipos}','${req.body.Descensos}','${req.body.Maximo_goleador}','${req.body.ID_Liga},${req.body.ID_Conferencia}')`)
    console.log({respuesta})
    res.send("ok")}
})
   
    //pedido put

    app.put('/modificarClub', async function (req, res){
        const respuesta = await realizarQuery(`UPDATE Clubes SET Cantidad_titulos = ${req.body.Cantidad_titulos} WHERE ID_Club =${req.body.ID_Club}`)
        console.log({respuesta})
        res.send("ok")
      });
   
    app.put('/modificarLigas', async function (req, res){
        const respuesta = await realizarQuery(`UPDATE Ligas SET ID_Conferencia = ${req.body.ID_Conferencia} WHERE ID_Liga =${req.body.ID_Liga}`)
        console.log({respuesta})
        res.send("ok")
      });
      

      app.put('/modificarConferencias', async function (req, res){
        const respuesta = await realizarQuery(`UPDATE Conferencias SET Continente = "${req.body.Continente}" WHERE ID_Conferencia =${req.body.ID_Conferencia}`)
        console.log({respuesta})
        res.send("ok")
      });

        app.delete('/borrarConferencias', async function (req, res){
          //  await realizarQuery(`DELETE FROM Ligas WHERE ID_Conferencia = ${req.body.ID_Conferencia}`); si quisiera borrar la liga cuando se borra una conferencia
            const respuesta = await realizarQuery(`DELETE FROM Conferencias WHERE ID_Conferencia = ${req.body.ID_Conferencia}`);
            console.log({respuesta})
            res.send("ok")
        });

        
    //pedido delete
   
        app.delete('/borrarClubes', async function (req, res){
        const respuesta = await realizarQuery(`DELETE FROM Clubes WHERE ID_Clubes = ${req.body.ID_Clubes}`)
        console.log({respuesta})
        res.send("ok")
      });
      app.delete('/borrarLigas', async function (req, res){
        //  await realizarQuery(`DELETE FROM Cluebes WHERE ID_Ligas = ${req.body.ID_Liga}`); si quisiera borrar un club cuando se borra una liga
        const respuesta = await realizarQuery(`DELETE FROM Ligas WHERE ID_Ligas = ${req.body.ID_Ligas}`)
        console.log({respuesta})
        res.send("ok")
      });
   