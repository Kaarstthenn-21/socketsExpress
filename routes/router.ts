

import { Router, Request, Response } from 'express';
import ServerBase from '../classes/server';
import { Socket } from 'socket.io';
import { usuariosConectados } from '../sockets/sockets';

const router = Router();

router.get('/mensajes', (req: Request, res: Response) => {
    res.json({
        ok: true,
        mensaje: 'Todo esta bien'
    })
});

router.post('/mensajes', (req: Request, res: Response) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const server = ServerBase.instance;

    const payload = {
        de,
        cuerpo
    }
    server.io.emit('mensaje-nuevo', payload);

    res.json({
        ok: true,
        cuerpo,
        de,
    })
})

router.post('/mensajes/:id', (req: Request, res: Response) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    const server = ServerBase.instance;

    const payload = {
        de,
        cuerpo
    }

    server.io.in(id).emit('mensaje-privado', payload);

    res.json({
        ok: true,
        cuerpo,
        de,
        id,
    })
})


// Servicio para obtener todos los Id´s de los usuarios
router.get('/usuarios', async (req: Request, res: Response) => {
    const server = ServerBase.instance;

    await server.io.fetchSockets()
        .then((sockets: any[]) => {

            if (sockets.length > 0) {
                let aux: string[] = [];
                sockets.forEach((ele: any) => {
                    aux.push(ele.id);
                });

                return res.json({ ok: true, clientes: aux })

            } else {

                return res.json({ ok: false, clientes: [] })

            }

        }).catch(err => {
            return res.json({
                ok: false,
                clientes: []
            })
        })
});

// Obtener usuarios y sus nombres
router.get('/usuarios/detalle', async (req: Request, res: Response) => { 
    res.json({ ok: true, clientes: usuariosConectados.getList()  })
});


export default router;