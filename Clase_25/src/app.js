import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import config from './config/config.js';
// import program from './process.js';


//Passport imports

//Routers
import viewsRouter from './routes/views.router.js';
//import usersViewRouter from './routes/users.views.router.js';
//Custom - Extended


const app = express();

//JSON settings:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

//Declare routers:
app.use("/", viewsRouter);
//app.use("/users", usersViewRouter);

// const SERVER_PORT = 9090;
const SERVER_PORT = config.port;


app.listen(SERVER_PORT, () => {
    console.log("Servidor escuchando por el puerto: " + SERVER_PORT);
    // console.log(process);
    // console.log(process.argv);

    //Excluyendo los args por defecto:
    // console.log(process.argv.slice(2));
    // const args = process.argv.slice(2);

    // console.log(config);
    // console.log(process.env.MONGO_URL);

    // 2do - Listeners
    // process.exit(5);

    // Esta exception no fue capturada, o controlada.
    // Exception no capturada: TypeError: console is not a function
    // console();


});
