import { db } from '../config/db.js';

export const crearTipoProducto = async (tipoProducto) => {
    const [result] = await db.query('INSERT INTO tipoProducto SET ?', [tipoProducto]);
    return result;
};

export const obtenerTiposProducto = async () => {
    const [result] = await db.query('SELECT * FROM tipoProducto');
    return result;
};

export const obtenerTipoProductoPorId = async (id) => {
    const [result] = await db.query('SELECT * FROM tipoProducto WHERE idTipoProducto = ?', [id]);
    return result[0];
};

export const actualizarTipoProducto = async (id, datos) => {
    const [result] = await db.query('UPDATE tipoProducto SET ? WHERE idTipoProducto = ?', [datos, id]);
    return result;
};

export const actualizarStock = async (id, cantidad) => {
    const [result] = await db.query('UPDATE tipoProducto SET stock = stock + ? WHERE idTipoProducto = ?', [cantidad, id]);
    return result;
};

export const eliminarTipoProducto = async (id) => {
    const [result] = await db.query('DELETE FROM tipoProducto WHERE idTipoProducto = ?', [id]);
    return result;
};
