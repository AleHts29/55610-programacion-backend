import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import session from 'express-session'

import FileStore from 'session-file-store'
import MongoStore from 'connect-mongo'
import mongoose from 'mongoose'

// Passport Imports
import passport from 'passport';
import initializePassport from './config/passport.config.js'



// Imports Routes
import sessionsRouter from './routes/sessions.router.js'
import usersViewRouter from './routes/users.views.router.js';
import githubLoginViewRouter from './routes/github-login.views.router.js'

const app = express();

//JSON settings:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'))

//Conectamos nuestra session con el file storage.
// const fileStore = FileStore(session)


const MONGO_URL = "mongodb://localhost:27017/clase21?retryWrites=true&w=majority";

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


// Middleware de passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use('/', viewsRouter)
app.use('/users', usersViewRouter)
app.use('/api/sessions', sessionsRouter)
app.use("/github", githubLoginViewRouter)

const PORT = 9090
app.listen(PORT, () => {
    console.log(`Server run on port: ${PORT}`);
})


/*=============================================
=            connectMongoDB                   =
=============================================*/
const connectMongoDB = async () => {
    try {
        await mongoose.connect(MONGO_URL)
        console.log("Conectado con exito a la DB usando Mongoose!!");
    } catch (error) {
        console.error("No se pudo conectar a la BD usando Moongose: " + error);
        process.exit();
    }
}
connectMongoDB();