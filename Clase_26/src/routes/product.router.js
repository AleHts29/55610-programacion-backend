import express from 'express';
// Debemos importar un controller
import { getDatosControllers, postDatosControllers, deleteDatosControllers } from '../controllers/produts.Controller.js'

const router = express.Router();

//GET
router.get('/', getDatosControllers);

// POST
router.post('/', postDatosControllers);


// Delete
router.delete('/', deleteDatosControllers);


export default router; 