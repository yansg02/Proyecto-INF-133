import axios from 'axios';

const API_URL = 'http://localhost:3001/api/usuarios';

export const registrarUsuario = async (usuario) => {
    try {
        const res = await axios.post(API_URL, usuario);
        return res.data;
    } catch (error) {
        console.log('Error registrar:', error);
        throw error;
    }
};

export const loginUsuario = async (nombUsuario, contrasenia) => {
    try {
        const res = await axios.post(`${API_URL}/login`, { nombUsuario, contrasenia });
        return res.data;
    } catch (error) {
        console.log('Error login:', error);
        throw error;
    }
};

export const verificarUsuario = async (usuario) => {
    try {
        const res = await axios.get(`${API_URL}/verificar/${usuario}`);
        return res.data.existe;
    } catch (error) {
        console.log('Error verificar:', error);
        throw error;
    }
};

export const obtenerUsuarios = async () => {
    try {
        const res = await axios.get(API_URL);
        return res.data.usuarios;
    } catch (error) {
        console.log('Error obtener:', error);
        throw error;
    }
};

export const actualizarUsuario = async (ci, datos) => {
    try {
        const res = await axios.put(`${API_URL}/${ci}`, datos);
        return res.data;
    } catch (error) {
        console.log('Error actualizar:', error);
        throw error;
    }
};

export const eliminarUsuario = async (ci) => {
    try {
        const res = await axios.delete(`${API_URL}/${ci}`);
        return res.data;
    } catch (error) {
        console.log('Error eliminar:', error);
        throw error;
    }
};