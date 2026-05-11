import { db } from '../config/db.js';

export const crearProducto = async (producto) => {
    const [result] = await db.query('INSERT INTO producto SET ?', [producto]);
    return result;
};

export const obtenerProductos = async () => {
    const [result] = await db.query('SELECT * FROM producto');
    return result;
};

export const obtenerProductoPorId = async (id) => {
    const [result] = await db.query('SELECT * FROM producto WHERE idProducto = ?', [id]);
    return result[0];
};

export const actualizarProducto = async (id, datos) => {
    const [result] = await db.query('UPDATE producto SET ? WHERE idProducto = ?', [datos, id]);
    return result;
};

export const eliminarProducto = async (id) => {
    const [result] = await db.query('DELETE FROM producto WHERE idProducto = ?', [id]);
    return result;
};

export const buscarProductosPorCategoria = async (categoria) => {
    const [result] = await db.query('SELECT * FROM producto WHERE categoria = ?', [categoria]);
    return result;
};