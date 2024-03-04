'use strict'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { dbConnection } from './connection.js';
import authRoutes from '../src/auth/auth.routes.js';
// aqui van las importaciones de lo que vaya a usar en este caso creo que son administrador y clientes. 

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.authPath = '/storeApi/auth'
        //aqui van los "Paths" de las importaciones de arriba
        
        this.middlewares();
        this.conectarDB();
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(express.urlencoded({extended: fase}));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes(){
        this.app.use(this.authPath, authRoutes);
        // aqui van los "this.app.use" de los que no he puesto
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server running on port ', this.port);
        });
    }
}

export default Server;