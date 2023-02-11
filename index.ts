import ServerBase from "./classes/server";
import router from './routes/router';
import bodyParser from "body-parser";
import cors from 'cors'


const server = ServerBase.instance;

//BodyParser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

//Cors
server.app.use(cors({
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true,
}))

server.app.options('*', cors({
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true,
}))

//Rutas de servicios

server.app.use('/', router)

server.start(() => {
    console.log(`Servidor corriendo en el puerto ${server.port}`);
})