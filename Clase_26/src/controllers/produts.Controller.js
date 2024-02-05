// Importar Capa services
import { obtenerDatos, crearDato, deleteServices } from '../services/product.Services.js'


export const getDatosControllers = async (req, res) => {
    let datos = await obtenerDatos();
    res.json(datos);
}


export const postDatosControllers = async (req, res) => {
    let dato = req.body;
    await crearDato(dato);
    res.json({ dato })
}

export const deleteDatosControllers = async (req, res) => {
    let { id } = req.params;
    await deleteServices(id);
    res.json({ msj: "delete product" })
}