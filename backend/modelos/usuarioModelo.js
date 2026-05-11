import { db } from '../config/db.js';

export const crearUsuario = async (usuario) => {
    const [result] = await db.query('INSERT INTO usuario SET ?', [usuario]);
    return result;
};

export const obtenerUsuarios = async () => {
    const [result] = await db.query(`
        SELECT ci, nombre, apPaterno, apMaterno, email, telefono, rol, estado, fechaRegistro 
        FROM usuario
    `);
    return result;
};


export const obtenerUsuarioPorCI = async (ci) => {
    const [result] = await db.query('SELECT * FROM usuario WHERE ci = ?', [ci]);
    return result[0];
};

export const loginUsuario = async (nombUsuario) => {
    const [result] = await db.query(
        'SELECT * FROM usuario WHERE nombUsuario = ?',
        [nombUsuario]
    );
    return result[0];
};

export const verificarUsuario = async (nombUsuario) => {
    const [result] = await db.query('SELECT nombUsuario FROM usuario WHERE nombUsuario = ?', [nombUsuario]);
    return result.length > 0;
};

export const actualizarUsuario = async (ci, datos) => {
    const [result] = await db.query('UPDATE usuario SET ? WHERE ci = ?', [datos, ci]);
    return result;
};

export const eliminarUsuario = async (ci) => {
    const [result] = await db.query("UPDATE usuario SET estado = 'INACTIVO' WHERE ci = ?", [ci]);
    return result;
};