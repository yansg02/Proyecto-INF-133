import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const obtenerTiposProducto = async () => {
    try {
        const response = await axios.get(`${API_URL}/tipos-producto`);
        return response.data.tiposProducto;
    } catch (error) {
        console.error('Error al obtener tipos de producto:', error);
        throw error;
    }
};

export const crearTipoProducto = async (tipoProducto) => {
    try {
        const response = await axios.post(`${API_URL}/tipos-producto`, tipoProducto);
        return response.data;
    } catch (error) {
        console.error('Error al crear tipo de producto:', error);
        throw error;
    }
};

export const actualizarTipoProducto = async (id, tipoProducto) => {
    try {
        const response = await axios.put(`${API_URL}/tipos-producto/${id}`, tipoProducto);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar tipo de producto:', error);
        throw error;
    }
};

export const eliminarTipoProducto = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/tipos-producto/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar tipo de producto:', error);
        throw error;
    }
};
