import express from 'express';
import config from './config/config.js';
//Clase de test:
import suma from './suma.js';
//import Routers
import usersRouter from './routers/users.router.js'

const app = express();

//JSON settings:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Declare routers:
app.use("/api/users", usersRouter);

const SERVER_PORT = config.port;
app.listen(SERVER_PORT, () => {
    console.log("Servidor escuchando por el puerto: " + SERVER_PORT);

    // TODO: Usando cammander -->  nodemon src/app.js --test true
    const executeTest = config.runTests;
    if (executeTest) {
        console.log("Ejecutando set de pruebas de func suma()");
        // Escenarios
        const testTotales = 4
        let testPasados = 0

        //Test 1: La función debe devolver null si algun parametro no es numérico.
        testPasados = escenario1(testPasados)

        //Test 2: La funcion debe devolver 0 si no se pasa ningún parámetro:
        testPasados = escenario2(testPasados)

        //Test 3: La función debe poder realizar la suma correctamente.
        testPasados = escenario3(testPasados);


        //Test 4: La función debe poder realizar la suma con cualquier cantidad de numeros.
        testPasados = escenario4(testPasados);

        console.log(`Test a ejecutar: ${testTotales}, pasados: ${testPasados}`);
    }


});



// TODO: Escenarios
const escenario1 = (testPasados) => {
    console.log("Test 1: La función debe devolver null si algun parametro no es numérico. ");

    // Given 
    const numero1 = "2";
    const numero2 = 2;

    // Then 
    let result = suma(numero1, numero2)

    // Assert
    if (result === null) {
        console.log("Test 1: pasado!!");
        testPasados++
    } else {
        console.error(`Test 1: no paso, se recibio ${typeof result}, pero se esperaba un NULL`);
    }

    return testPasados;
}


const escenario2 = (testPasados) => {
    console.log("Test 2: La funcion debe devolver 0 si no se pasa ningún parámetro:");

    // Given 
    // const numero1 = "2";
    // const numero2 = 2;

    // Then 
    let result = suma()

    // Assert
    if (result === 0) {
        console.log("Test 2: pasado!!");
        testPasados++
    } else {
        console.error(`Test 2: no paso, se recibio ${result}, pero se esperaba un 0`);
    }

    return testPasados;
}

const escenario3 = (testPasados) => {
    console.log("Test 3: La función debe poder realizar la suma correctamente.");

    // Given 
    const numero1 = 3;
    const numero2 = 2;

    // Then 
    let result = suma(numero1, numero2)

    // Assert
    const expected = numero1 + numero2
    if (result === expected) {
        console.log("Test 3: pasado!!");
        testPasados++
    } else {
        console.error(`Test 3: no paso, se recibio ${result}, pero se esperaba un ${expected}`);
    }

    return testPasados;
}

const escenario4 = (testPasados) => {
    console.log("Test 4: La función debe poder realizar la suma con cualquier cantidad de numeros");

    // Given
    const numerosEntrada = [1, 2, 3, 4, 5]


    // Then
    let result = suma(...numerosEntrada)

    // Assert
    const expected = 15;
    if (result === expected) {
        console.log("Test 4: pasado!!");
        testPasados++
    } else {
        console.error(`Test 4: no paso, se recibio ${result}, pero se esperaba un ${expected}`);
    }

    return testPasados;
}

