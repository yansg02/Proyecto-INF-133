import { db } from '../config/db.js';

export const crearFactura = async (factura) => {
    const [result] = await db.query('INSERT INTO factura SET ?', [factura]);
    return result;
};

export const obtenerFacturas = async () => {
    const [result] = await db.query(`
        SELECT f.*, u.nombre, u.apPaterno, u.apMaterno 
        FROM factura f 
        JOIN usuario u ON f.ci_cliente = u.ci
    `);
    return result;
};

export const obtenerFacturaPorId = async (id) => {
    const [result] = await db.query(`
        SELECT f.*, u.nombre, u.apPaterno, u.apMaterno, u.ci 
        FROM factura f 
        JOIN usuario u ON f.ci_cliente = u.ci 
        WHERE f.idFactura = ?
    `, [id]);
    return result[0];
};

export const obtenerFacturasPorCliente = async (ci_cliente) => {
    const [result] = await db.query('SELECT * FROM factura WHERE ci_cliente = ?', [ci_cliente]);
    return result;
};