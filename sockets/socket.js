const { io } = require('../index');

const Band = require('..models/band');
const Bands = require('..models/bands');

const bands = new Bands();
bands.addBand( new Band( 'Queen 1' ) );
bands.addBand( new Band( 'Queen 2' ) );
bands.addBand( new Band( 'Queen 3' ) );
bands.addBand( new Band( 'Queen 4' ) );

//Mensajes de sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    //emición del cliente que se conecta
    client.emit( 'active-bands', bands.getBands );
    
    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    client.on( 'message', ( payload ) => {
        console.log( 'Mensaje!!! ' + payload.name );

        io.emit( 'message', { admin: 'New message'} );
    } );

    client.on( 'broadcast-message', ( payload ) => {
        //io.emit( 'new-message', payload ); esto emite a todos
        //los clientes conectados.
        client.broadcast.emit( 'new-message', payload );
        /*
        * Las lineas de arriba emiten a todos menos al 
        * clientes que emitio el mensaje
        */
    } );

});