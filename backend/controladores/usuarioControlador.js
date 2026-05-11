import * as modelo from '../modelos/usuarioModelo.js';
import bcrypt from 'bcryptjs';

export const crearUsuario = async (req, res) => {
    try {
        const usuario = req.body;
        if (usuario.rol && !['CLIENTE', 'ADMIN'].includes(usuario.rol)) {
            return res.status(400).json({ ok: false, mensaje: 'Rol no válido. Solo CLIENTE o ADMIN permitido.' });
        }
        if (usuario.contrasenia) {
            const salt = await bcrypt.genSalt(10);
            usuario.contrasenia = await bcrypt.hash(usuario.contrasenia, salt);
        }
        await modelo.crearUsuario(usuario);
        res.json({ ok: true, mensaje: 'Usuario creado' });
    } catch (error) {
        console.log('Error crear:', error);
        res.status(500).json({ ok: false, mensaje: 'Error al crear' });
    }
};

export const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await modelo.obtenerUsuarios();
        res.json({ ok: true, usuarios });
    } catch (error) {
        console.log('Error obtener:', error);
        res.status(500).json({ ok: false, mensaje: 'Error al obtener' });
    }
};

export const obtenerUsuario = async (req, res) => {
    try {
        const { ci } = req.params;
        const usuario = await modelo.obtenerUsuarioPorCI(ci);
        if (!usuario) return res.status(404).json({ ok: false, mensaje: 'No encontrado' });
        res.json({ ok: true, usuario });
    } catch (error) {
        console.log('Error obtener:', error);
        res.status(500).json({ ok: false, mensaje: 'Error al obtener' });
    }
};

export const login = async (req, res) => {
    try {
        const { nombUsuario, contrasenia } = req.body;
        const usuario = await modelo.loginUsuario(nombUsuario);
        if (!usuario) return res.status(401).json({ ok: false, mensaje: 'Credenciales incorrectas' });

        const match = await bcrypt.compare(contrasenia || '', usuario.contrasenia || '');
        if (!match) return res.status(401).json({ ok: false, mensaje: 'Credenciales incorrectas' });

        const { contrasenia: _hash, ...usuarioSinPass } = usuario;
        res.json({ ok: true, mensaje: 'Login exitoso', usuario: usuarioSinPass });
    } catch (error) {
        console.log('Error login:', error);
        res.status(500).json({ ok: false, mensaje: 'Error en login' });
    }
};

export const loginUsuario = async (req, res) => {
    try {
        const { nombUsuario, contrasenia, recaptchaToken } = req.body;
        
        if (recaptchaToken) {
            const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=TU_CLAVE_SECRETA&response=${recaptchaToken}`;
            const response = await fetch(verifyUrl, { method: 'POST' });
            const data = await response.json();
            
            if (!data.success) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Verificación de reCAPTCHA fallida'
                });
            }
        } else {
            return res.status(400).json({
                ok: false,
                mensaje: 'Token de reCAPTCHA no proporcionado'
            });
        }
        const usuario = await modelo.loginUsuario(nombUsuario);
        if (!usuario) return res.status(401).json({ ok: false, mensaje: 'Credenciales incorrectas' });

        const match = await bcrypt.compare(contrasenia || '', usuario.contrasenia || '');
        if (!match) return res.status(401).json({ ok: false, mensaje: 'Credenciales incorrectas' });

        const { contrasenia: _hash, ...usuarioSinPass } = usuario;
        res.json({ ok: true, mensaje: 'Login exitoso', usuario: usuarioSinPass });
    } catch (error) {
        console.log('Error login:', error);
        res.status(500).json({ ok: false, mensaje: 'Error en login' });
    }
};

export const verificarUsuario = async (req, res) => {
    try {
        const { usuario } = req.params;
        const existe = await modelo.verificarUsuario(usuario);
        res.json({ ok: true, existe });
    } catch (error) {
        console.log('Error verificar:', error);
        res.status(500).json({ ok: false, mensaje: 'Error al verificar' });
    }
};


export const actualizarUsuario = async (req, res) => {
    try {
        const { ci } = req.params;
        const datos = req.body;
        await modelo.actualizarUsuario(ci, datos);
        res.json({ ok: true, mensaje: 'Usuario actualizado' });
    } catch (error) {
        console.log('Error actualizar:', error);
        res.status(500).json({ ok: false, mensaje: 'Error al actualizar' });
    }
};

export const eliminarUsuario = async (req, res) => {
    try {
        const { ci } = req.params;
        await modelo.eliminarUsuario(ci);
        res.json({ ok: true, mensaje: 'Usuario eliminado' });
    } catch (error) {
        console.log('Error eliminar:', error);
        res.status(500).json({ ok: false, mensaje: 'Error al eliminar' });
    }
};