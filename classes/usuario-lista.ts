import { Usuario } from "./usuario";



export class UsuarioLista {
    private lista: Usuario[] = [];


    constructor() {

    }

    // Agregar un usuario
    public agregar(usuario: Usuario) {
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    }

    public actualizarNombre(id: string, nombre: string) {

        for (let usuario of this.lista) {
            if (usuario.id === id) {
                usuario.nombre = nombre;
                break;
            }
        }
        console.log("Actualizando usuario");
    }

    public getList() {
        return this.lista;
    }

    public getUsuarioById(id: string) {
        return this.lista.find(usuario => usuario.id === id);
    }

    // Obtener usuarios en una sala en particular

    public getUsuariosEnSala(sala: string) {
        return this.lista.filter(usuario => usuario.sala === sala)
    }

    //Borrar un usuario

    public borrarUsuario(id: string) {
        const tempUsuario = this.getUsuarioById(id);

        this.lista = this.lista.filter(usuario => usuario.id !== id)

        return tempUsuario;
    }
}