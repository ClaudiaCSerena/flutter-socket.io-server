const { io } = require('../index');

//Mensajes de sockets
io.on('connection', client => { //el client es un pc que se acaba de conectar al server
    console.log('Cliente conectado');
    client.on('disconnect', () => {
      console.log('Cliente desconectado');
    });
  
    client.on('mensaje', (payload) => {
      console.log('Mensaje', payload);
  
      io.emit('mensaje', {admin: 'Nuevo mensaje'}); //mensaje a todos los clientes conectados
    })
  
  });