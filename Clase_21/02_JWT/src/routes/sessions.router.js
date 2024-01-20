import { Router } from 'express';
import userModel from '../models/user.model.js';
import { createHash, generateJWToken, isValidPassword } from '../utils.js'
import passport from 'passport';

const router = Router();


/*=============================================
=                   Passport Github           =
=============================================*/
router.get("/github", passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => {
    { }
})

router.get("/githubcallback", passport.authenticate('github', { failureRedirect: '/github/error' }), async (req, res) => {
    const user = req.user;
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    };
    req.session.admin = true;
    res.redirect("/users")
})




/*=============================================
=                   Passport Local            =
=============================================*/
// Register
router.post('/register', passport.authenticate('register', {
    failureRedirect: 'api/session/fail-register'
}), async (req, res) => {
    console.log("Registrando usuario:");
    res.status(201).send({ status: "success", message: "Usuario creado con extito." });
})


// Login
router.post('/login', passport.authenticate('login',
    {
        failureRedirect: 'api/session/fail-login'
    }
), async (req, res) => {
    console.log("User found to login:");

    const user = req.user;
    console.log(user);
    if (!user) return res.status(401).send({ status: "error", error: "El usuario y la contraseña no coinciden!" });

    // req.session.user = {
    //     name: `${user.first_name} ${user.last_name}`,
    //     email: user.email,
    //     age: user.age
    // }

    // Usando JWT usando Postman - no se se usan session
    const access_token = generateJWToken(user)
    console.log(access_token);
    res.send({ access_token: access_token });
})


router.get("/fail-register", (req, res) => {
    res.status(401).send({ error: "Failed to process register!" });
});

router.get("/fail-login", (req, res) => {
    res.status(401).send({ error: "Failed to process login!" });
});




export default router;


// // Usamos updateOne para actualizar el documento
// const result = await userModel.updateOne({ _id: userIdToUpdate }, { $set: userToUpdate });