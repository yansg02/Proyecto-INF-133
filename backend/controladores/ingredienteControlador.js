import * as nuevo from './tipoProductoControlador.js';

export const crearIngrediente = async (req, res) => {
    return nuevo.crearTipoProducto(req, res);
};

export const obtenerIngredientes = async (req, res) => {
    return nuevo.obtenerTiposProducto(req, res);
};

export const obtenerIngrediente = async (req, res) => {
    return nuevo.obtenerTipoProducto(req, res);
};

export const actualizarIngrediente = async (req, res) => {
    return nuevo.actualizarTipoProducto(req, res);
};

export const actualizarStock = async (req, res) => {
    return nuevo.actualizarStock(req, res);
};

export const eliminarIngrediente = async (req, res) => {
    return nuevo.eliminarTipoProducto(req, res);
};