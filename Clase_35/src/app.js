import express from 'express';
import config from './config/config.js';

// **_BASE
import cluster from 'cluster';
import { cpus } from 'os';

//import Routers
//Performance test:
import performanceRouter from './routers/performance-test.router.js';
import { addLogger } from './config/logger.js';


// 01
// console.log("Preguntar si es el cluster es primario:");
// console.log(cluster.isPrimary);

// if (cluster.isPrimary) {
//     console.log("Soy proceso primario y voy delegar el trabajo a un Worker.");

//     console.log("Numero de CPUs en mi maquina: ");
//     console.log(cpus().length);

//     cluster.fork(); //se utiliza para crear un nuevo proceso hijo (worker)
// } else {
//     console.log("Soy un Worker!!");
// }


// 02
// console.log("Preguntar si es el cluster es primario:");
// console.log(cluster.isPrimary);

// if (cluster.isPrimary) {
//     const numeroProcesadores = cpus().length
//     console.log("Soy proceso primario y voy delegar el trabajo a un Worker.");
//     console.log("Numero de CPUs en mi maquina: ");
//     console.log(numeroProcesadores);

//     for (let i = 0; i < numeroProcesadores - 1; i++) {
//         cluster.fork(); //se utiliza para crear un nuevo proceso hijo (worker)
//     }
// } else {
//     console.log("Soy un Worker!!");
// }


// 03
console.log("Preguntar si es el cluster es primario:");
console.log(cluster.isPrimary);

if (cluster.isPrimary) {
    console.log("Identificamos el ProcessID Pasdre:" + process.pid);
    const numeroProcesadores = cpus().length
    console.log("Soy proceso primario y voy delegar el trabajo a un Worker.");
    console.log("Numero de CPUs en mi maquina: ");
    console.log(numeroProcesadores);

    console.log("Proceso primario, generando Fork para un trabajador.");
    for (let i = 0; i < numeroProcesadores - 1; i++) {
        cluster.fork(); //se utiliza para crear un nuevo proceso hijo (worker)
    }

    // Listener para manejar la mueerte de un worker
    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} died`);

        // Creamos un nuevo worker para reemplazar al que murio
        cluster.fork()
    })
} else {
    console.log(`Soy un proceso worker con el id: ${process.pid}`);

    const app = express();

    app.use(addLogger);

    // Declaramos un router
    app.use('/api/performance', performanceRouter)

    const SERVER_PORT = config.port;
    app.listen(SERVER_PORT, () => {
        console.log("Servidor escuchando por el puerto: " + SERVER_PORT);
    });
}

