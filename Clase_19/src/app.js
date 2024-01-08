import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import session from 'express-session'

import FileStore from 'session-file-store'
import MongoStore from 'connect-mongo'
import mongoose from 'mongoose'


const app = express();

//JSON settings:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars');

//Conectamos nuestra session con el file storage.
// const fileStore = FileStore(session)


const MONGO_URL = "mongodb://localhost:27017/clase19?retryWrites=true&w=majority";

// Configuracion de Session
app.use(session(
    {
        //ttl: Time to live in seconds,
        //retries: Reintentos para que el servidor lea el archivo del storage.
        //path: Ruta a donde se buscará el archivo del session store.
        // // Usando --> session-file-store
        // store: new fileStore({ path: "./sessions", ttl: 15, retries: 0 }),

        // Usando --> connect-mongo
        store: MongoStore.create({
            mongoUrl: MONGO_URL,
            //mongoOptions --> opciones de confi para el save de las sessions
            mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
            ttl: 10 * 60
        }),

        secret: "coderS3cr3t",
        resave: false, // guarda en memoria
        saveUninitialized: true //lo guarda a penas se crea
    }
))


app.use('/', viewsRouter)


const PORT = 9090
app.listen(PORT, () => {
    console.log(`Server run on port: ${PORT}`);
})