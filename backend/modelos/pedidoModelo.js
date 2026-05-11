import { db } from '../config/db.js';

export const crearPedido = async (pedido) => {
    const [result] = await db.query('INSERT INTO pedido SET ?', [pedido]);
    return result;
};

export const obtenerPedidos = async () => {
    const [result] = await db.query(`
        SELECT p.*, u.nombre, u.apPaterno, u.apMaterno 
        FROM pedido p 
        JOIN usuario u ON p.ci_cliente = u.ci
    `);
    return result;
};

export const obtenerPedidoPorId = async (id) => {
    const [result] = await db.query(`
        SELECT p.*, u.nombre, u.apPaterno, u.apMaterno, u.telefono 
        FROM pedido p 
        JOIN usuario u ON p.ci_cliente = u.ci 
        WHERE p.idPedido = ?
    `, [id]);
    return result[0];
};

export const obtenerPedidosPorCliente = async (ci_cliente) => {
    const [result] = await db.query('SELECT * FROM pedido WHERE ci_cliente = ?', [ci_cliente]);
    return result;
};

export const actualizarEstadoPedido = async (id, estado) => {
    const [result] = await db.query('UPDATE pedido SET estado = ? WHERE idPedido = ?', [estado, id]);
    return result;
};

export const eliminarPedido = async (id) => {
    const [result] = await db.query('DELETE FROM pedido WHERE idPedido = ?', [id]);
    return result;
};