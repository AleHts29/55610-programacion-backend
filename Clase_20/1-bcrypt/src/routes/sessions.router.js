import { Router } from 'express';
import userModel from '../models/user.model.js';
import { createHash, isValidPassword } from '../utils.js'

const router = Router();

// Register
router.post('/register', async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    console.log("Registrando usuario:");
    console.log(req.body);

    //Validamos si el user existe en la DB
    const exist = await userModel.findOne({ email });
    if (exist) {
        return res.status(400).send({ status: 'error', message: "Usuario ya existe!" })
    }

    const user = {
        first_name,
        last_name,
        email,
        age,
        // password //se encriptara despues...
        password: createHash(password)
    }

    const result = await userModel.create(user);
    res.send({ status: "success", message: "Usuario creado con extito con ID: " + result.id });
})


// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    // const user = await userModel.findOne({ email, password }); //Ya que el password no está hasheado, podemos buscarlo directamente

    const user = await userModel.findOne({ email });

    if (!user) return res.status(401).send({ status: 'error', error: "Incorrect credentials" })

    if (!isValidPassword(user, password)) {
        return res.status(401).send({ status: "error", error: "Incorrect credentials" })
    }

    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    }

    res.send({ status: "success", payload: req.session.user, message: "¡Primer logueo realizado! :)" });
})

export default router;


// // Usamos updateOne para actualizar el documento
// const result = await userModel.updateOne({ _id: userIdToUpdate }, { $set: userToUpdate });