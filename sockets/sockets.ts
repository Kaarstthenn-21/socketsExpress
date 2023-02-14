import { Server, Socket } from 'socket.io';
import { UsuarioLista } from '../classes/usuario-lista';
import { Usuario } from '../classes/usuario';

export const usuariosConectados = new UsuarioLista();

export const conectarCliente = (cliente: Socket, io: Server) => {
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);

}

export const disconnect = (cliente: Socket, io: Server) => {
    cliente.on('disconnect', () => {
        usuariosConectados.borrarUsuario(cliente.id)
        io.emit('usuarios-activos', usuariosConectados.getList());
        console.log("CLiente desconectado");
    })
}

// Escchar nensaje
export const mensaje = (cliente: Socket, io: Server) => {
    cliente.on('mensaje', (payload, callback) => {
        console.log("Cliente mensaje", payload);

        io.emit('mensaje-nuevo', payload);
    })
}

export const login = (cliente: Socket, io: Server) => {
    cliente.on('configurar-usuario', (payload, callback: Function) => {
        console.log("Configurando usuario", payload);

        usuariosConectados.actualizarNombre(cliente.id, payload.nombre)
        io.emit('usuarios-activos', usuariosConectados.getList());

        console.log(cliente.id, payload.nombre);
        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre} configurado`
        })
    })
}

// Obtener usuarios
export const ObtenerUsuarios = (cliente: Socket, io: Server) => {
    cliente.on('obtener-usuarios', () => {
        io.emit('usuarios-activos', usuariosConectados.getList());

    })
}