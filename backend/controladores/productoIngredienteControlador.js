import * as nuevo from './productoTipoProductoControlador.js';

export const agregarIngrediente = async (req, res) => {
    return nuevo.agregarTipoProducto(req, res);
};

export const obtenerIngredientesProducto = async (req, res) => {
    return nuevo.obtenerTiposProductoDeProducto(req, res);
};

export const eliminarIngredienteProducto = async (req, res) => {
    const { idProducto, idIngrediente } = req.params;
    req.params.idTipoProducto = idIngrediente;
    return nuevo.eliminarTipoProductoDeProducto(req, res);
};