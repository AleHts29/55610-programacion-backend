import CustomRouter from './custom.router.js';
import UserService from '../../services/db/users.service.js';
import { createHash, isValidPassword, generateJWToken } from '../../utils.js';


export default class UsersExtendRouter extends CustomRouter {
    init() {

        const userService = new UserService();

        /*====================================================
                    EJEMPLO de como se conecta con el CustomRouter
                    --> this.verboHTTP(path, policies, ...callbacks);                   
        =====================================================*/

        this.get('/', (req, res) => {
            console.log("TEST");
            res.send("Hola coders!!")
        })

    }

}
