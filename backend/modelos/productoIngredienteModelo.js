import * as nuevo from './productoTipoProductoModelo.js';

export const agregarIngredienteAProducto = async (productoIngrediente) => {
    return nuevo.agregarTipoProductoAProducto(productoIngrediente);
};

export const obtenerIngredientesDeProducto = async (idProducto) => {
    return nuevo.obtenerTiposProductoDeProducto(idProducto);
};

export const eliminarIngredienteDeProducto = async (idProducto, idIngrediente) => {
    return nuevo.eliminarTipoProductoDeProducto(idProducto, idIngrediente);
};