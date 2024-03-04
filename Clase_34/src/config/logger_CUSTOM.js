import winston, { transports } from "winston";
import config from "./config.js";

//TODO:: Creating our logger:
const customLevelsOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        http: 3,
        info: 4,
        debug: 5
    },
    colors: {
        fatal: 'red',
        error: 'orange',
        warning: 'yellow',
        http: 'red',
        info: 'blue',
        debug: 'white'
    }
};


// Logger en env desarrollo
const prodLogger = winston.createLogger({
    // Declaramos el trasnport
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console(
            {
                level: "info",
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.simple()
                )
            }
        ),
        new winston.transports.File(
            {
                filename: './errors.log',
                level: 'warning', //Cambiamos el logger level name.
                format: winston.format.simple()
            }
        )
    ]
})


// Logger en env prod
const devLogger = winston.createLogger({
    // Declaramos el trasnport
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console({ level: "http" }),
        new winston.transports.File({ filename: './errors.log', level: 'warning' })
    ]
})


// Declaramos a middleware
export const addLogger = (req, res, next) => {
    if (config.environment === 'production') {
        req.logger = prodLogger

        req.logger.warning(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
        req.logger.http(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
        req.logger.error(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)

    } else {
        req.logger = devLogger

        req.logger.warning(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
        req.logger.http(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
        req.logger.error(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
    }
    next();
}



// Revisar --> Documentacion para tema de colores
/*
https://github.com/winstonjs/winston?tab=readme-ov-file#combining-formats
https://www.npmjs.com/package//winston#common-transport-options
*/