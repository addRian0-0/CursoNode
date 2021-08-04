const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        
        this.app = express();
        this.port = process.env.PORT

        this.usuariosRoutePath = '/api/usuarios';
        this.authPath = '/api/auth';
        this.categorias = '/api/categorias';
        this.productos = '/api/productos';
        this.buscar = '/api/buscar';
        this.uploads = '/api/uploads'
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

        //Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
        
    }

    routes() {

        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosRoutePath, require('../routes/Usuarios'));
        this.app.use(this.categorias, require('../routes/Categorias'));
        this.app.use(this.productos, require('../routes/Productos'));
        this.app.use(this.buscar, require('../routes/Buscar'));
        this.app.use(this.uploads, require('../routes/uploads'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}

module.exports = Server;