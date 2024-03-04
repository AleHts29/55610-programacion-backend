import winston from "winston";


//TODO::Creating our logger:
const logger = winston.createLogger({
    // Declaramos el trasnport
    transports: [
        new winston.transports.Console({ level: "http" }),
        new winston.transports.File({ filename: './errors.log', level: 'warn' })
    ]
})

// Declaramos a middleware
export const addLogger = (req, res, next) => {
    req.logger = logger

    req.logger.warn(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
    req.logger.http(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
    req.logger.error(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)

    // Este no aparece porque no esta definido dentro de los niveles
    req.logger.debug(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)

    next();
}

