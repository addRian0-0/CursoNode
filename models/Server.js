const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        
        this.app = express();
        this.port = process.env.PORT

        this.usuariosRoutePath = '/api/usuarios';
        this.authPath = '/api/auth';
        this.categorias = '/api/categorias';
        //Conectar a la BD
        this.connectDB();

        //Middlewares
        this.middlewares();

        //Routes
        this.routes();
    }

    async connectDB(){
        await dbConnection();
    }

    middlewares(){

        //Cors
        this.app.use(cors());
        this.app.use(morgan('dev'));

        //Parse/Read
        this.app.use(express.json());

        //Public
        this.app.use(express.static('public'));
        
    }

    routes() {

        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosRoutePath, require('../routes/Usuarios'));
        this.app.use(this.categorias, require('../routes/Categorias'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}

module.exports = Server;