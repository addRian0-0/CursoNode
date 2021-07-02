const express = require('express');
const cors = require('cors')

class Server {

    constructor() {
        
        this.app = express();
        this.port = process.env.PORT
        this.usuariosRoutePath = '/api/usuarios';

        //Middlewares
        this.middlewares();

        //Routes
        this.routes();
    }

    middlewares(){

        //Cors
        this.app.use(cors());

        //Parse/Read
        this.app.use(express.json());

        //Public
        this.app.use(express.static('public'));
        
    }

    routes() {

        this.app.use(this.usuariosRoutePath, require('../routes/Usuarios'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}

module.exports = Server;