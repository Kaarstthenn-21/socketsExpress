import { Server, Socket } from 'socket.io';

export const disconnect = (cliente: Socket) => {
    cliente.on('disconnect', () => {
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