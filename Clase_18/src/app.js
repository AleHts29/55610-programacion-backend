import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import session from 'express-session'


const app = express();

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars');


// Configuracion de Session
app.use(session(
    {
        secret: "coderS3cr3t",
        resave: true,
        saveUninitialized: true
    }
))


app.use('/', viewsRouter)


const PORT = 9090
app.listen(PORT, () => {
    console.log(`Server run on port: ${PORT}`);
})