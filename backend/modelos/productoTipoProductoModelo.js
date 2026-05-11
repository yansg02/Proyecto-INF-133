import { db } from '../config/db.js';

export const agregarTipoProductoAProducto = async (productoTipo) => {
    const [result] = await db.query('INSERT INTO producto_tipoProducto SET ?', [productoTipo]);
    return result;
};

export const obtenerTiposProductoDeProducto = async (idProducto) => {
    const [result] = await db.query(`
        SELECT pt.*, tp.nombre, tp.descripcion 
        FROM producto_tipoProducto pt 
        JOIN tipoProducto tp ON pt.idTipoProducto = tp.idTipoProducto 
        WHERE pt.idProducto = ?
    `, [idProducto]);
    return result;
};

export const eliminarTipoProductoDeProducto = async (idProducto, idTipoProducto) => {
    const [result] = await db.query(
        'DELETE FROM producto_tipoProducto WHERE idProducto = ? AND idTipoProducto = ?',
        [idProducto, idTipoProducto]
    );
    return result;
};
