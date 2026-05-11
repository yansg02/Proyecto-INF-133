import * as nuevo from './tipoProductoModelo.js';

export const crearIngrediente = async (ingrediente) => {
    return nuevo.crearTipoProducto(ingrediente);
};

export const obtenerIngredientes = async () => {
    return nuevo.obtenerTiposProducto();
};

export const obtenerIngredientePorId = async (id) => {
    return nuevo.obtenerTipoProductoPorId(id);
};

export const actualizarIngrediente = async (id, datos) => {
    return nuevo.actualizarTipoProducto(id, datos);
};

export const actualizarStock = async (id, cantidad) => {
    return nuevo.actualizarStock(id, cantidad);
};

export const eliminarIngrediente = async (id) => {
    return nuevo.eliminarTipoProducto(id);
};