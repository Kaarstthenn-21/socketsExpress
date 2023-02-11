import express from 'express';
import { HOST_FRONT, SERVER_PORT } from '../global/environment';
import { Server } from "socket.io";
import http from 'http';
import * as socket from '../sockets/sockets';


export default class ServerBase {

    private static _instance: ServerBase;

    public app: express.Application;
    public port: number;

    public io: Server;
    private httpServer: http.Server;

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server(this.app);
        this.io = new Server(this.httpServer, {
            cors: {
                origin: HOST_FRONT,
                methods: ["GET", "POST"]
            }
        });

        this.escucharSockets();
    }

    public static get instance() {
        return this._instance || (this._instance = new this());

    }


    private escucharSockets() {
        console.log("Conexiones");
        this.io.on("connection", (cliente) => {
            console.log("client connect");

            // Mensaje
            socket.mensaje(cliente, this.io);

            // Disconnect
            socket.disconnect(cliente);
        })
    }

    start(callback: Function) {

        this.httpServer.listen(this.port, () => { callback });
    }

}