import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const obtenerProductos = async () => {
    try {
        const response = await axios.get(`${API_URL}/productos`);
        return response.data.productos;
    } catch (error) {
        console.error('Error al obtener productos:', error);
        throw error;
    }
};

export const crearProducto = async (producto) => {
    try {
        const response = await axios.post(`${API_URL}/productos`, producto);
        return response.data;
    } catch (error) {
        console.error('Error al crear producto:', error);
        throw error;
    }
};

export const actualizarProducto = async (id, producto) => {
    try {
        const response = await axios.put(`${API_URL}/productos/${id}`, producto);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        throw error;
    }
};

export const eliminarProducto = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/productos/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        throw error;
    }
};