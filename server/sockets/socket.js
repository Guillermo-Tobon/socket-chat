const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../utilidades/utilidades')

const usuarios = new Usuarios();


io.on('connection', (client) => {

  client.on('entrarChat', (usuario, callback) =>{
    
    if ( !usuario.nombre || !usuario.sala ) {
      return callback({
        error: true,
        mensaje: 'El nombre/sala es necesario.'
      })
    }

    //Integra al usuario a una sala
    client.join(usuario.sala);

    usuarios.agregarPersona( client.id, usuario.nombre, usuario.sala );

    client.broadcast.to(usuario.sala).emit('listaPersonas', usuarios.getPersonasPorSala(usuario.sala));

    callback(usuarios.getPersonasPorSala(usuario.sala));
  });



  client.on('crearMensaje', ( data ) =>{
    let persona = usuarios.getPersona(client.id);
    let mensaje = crearMensaje( persona.nombre, data.mensaje );

    client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);

  })



  client.on('disconnect', () =>{
    let personaBorrada = usuarios.borrarPersona( client.id );

    client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} abandonó el chat`));
    client.broadcast.to(personaBorrada.sala).emit('listaPersonas', usuarios.getPersonasPorSala(personaBorrada.sala));
  })


  //Mensajes privados
  client.on('mensajePrivado', data =>{
    let persona = usuarios.getPersona( client.id );
    client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));
  })

  

});