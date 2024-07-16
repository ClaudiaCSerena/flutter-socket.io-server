const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand( new Band('Queen'));
bands.addBand( new Band('Bon Jovi'));
bands.addBand( new Band('Héroes del Silencio'));
bands.addBand( new Band('Metallica'));

//Mensajes de sockets

//Cuando se conecta 1 cliente:
io.on('connection', client => { //el client es un pc que se acaba de conectar al server
    console.log('Cliente conectado');
    client.emit('active-bands', bands.getBands()); //al conectarse el cliente le envío el listado de bandas
    client.on('disconnect', () => {
      console.log('Cliente desconectado');
    });
  
    client.on('mensaje', (payload) => {
      console.log('Mensaje', payload);
  
      io.emit('mensaje', {admin: 'Nuevo mensaje'}); //mensaje a todos los clientes conectados
    });

    //Para escuchar cuando el cliente emita 'vote-band':
    client.on('vote-band', (payload) => {
      bands.voteBand(payload.id); //hago la votación
      io.emit('active-bands', bands.getBands());
    });

    //Para escuchar el evento "add-band" y agregar una nueva banda al listado
    client.on('add-band', (payload) => {
      const newBand = new Band(payload.name);
      bands.addBand(newBand); //hago la votación
      io.emit('active-bands', bands.getBands());
    });

    //Para eliminar una banda, escucho el evento "delete-band"
    client.on('delete-band', (payload) => {
      bands.deleteBand(payload.id); //hago la votación
      io.emit('active-bands', bands.getBands()); //notifico a todos los clientes conectados
    });
 


    //Para escuchar cuando un cliente emita un nuevo mensaje:
    //client.on('emitir-mensaje', (payload) => {
      //console.log(payload);
     // io.emit('nuevo-mensaje', payload); //emite a todos los clientes
    // client.broadcast.emit('nuevo-mensaje', payload); //emite a todos los clientes menos al que lo envió
    //})
  
  });