const express = require('express'); //paquete de express (importación)
const path = require('path'); //paquete q viene con Node
require('dotenv').config();

//App de express:
const app = express(); //creo una aplicación, esto lo inicializa y puedo escuchar peticiones

//Node server:
const server = require('http').createServer(app); //cre mi servidor
module.exports.io = require('socket.io')(server); //para exportar io
require('./sockets/socket');

//Path (carpeta) público
const publicPath = path.resolve(__dirname, 'public'); //debo crear la carpeta public

app.use(express.static(publicPath));


//Escucho peticiones en el puerto 3000
server.listen(process.env.PORT,  (err) => {
    if (err) throw new Error(err);
    console.log('Servidor corriendo en puerto NEW', process.env.PORT); //si no hay error
});

//Con lo anterior ya tengo mi servidor