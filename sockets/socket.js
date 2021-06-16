const { io } = require('../index');

//Mensajes de sockets
io.on('connection', client => {
    console.log('Cliente conectado');
    
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