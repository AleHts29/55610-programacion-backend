// Importar capa de Models --> Datos
import { recuperarDatos, guardarDato, deleById } from '../models/productData.js'



// obtenerDatos, crearDato, deleteServices

export const obtenerDatos = async () => {
    // Logica de negocio
    // Validar si tengo stock

    return await recuperarDatos()

}

export const crearDato = async (dato) => {
    // logica de negocio
    // Validar si el producto ya existe

    dato.id = Math.random();
    await guardarDato(dato);
    return dato;
}

export const deleteServices = async (id) => {
    // logica
    return await deleById(id);
}