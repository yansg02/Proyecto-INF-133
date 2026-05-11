import { db } from '../config/db.js';

export const crearDetallePedido = async (detalle) => {
    const [result] = await db.query('INSERT INTO pedido_detalle SET ?', [detalle]);
    return result;
};

export const obtenerDetallesPorPedido = async (idPedido) => {
    const [result] = await db.query(`
        SELECT pd.*, p.nombreP, p.precio 
        FROM pedido_detalle pd 
        JOIN producto p ON pd.idProducto = p.idProducto 
        WHERE pd.idPedido = ?
    `, [idPedido]);
    return result;
};