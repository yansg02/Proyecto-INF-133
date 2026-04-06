import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const obtenerPedidos = async () => {
    try {
        const response = await axios.get(`${API_URL}/pedidos`);
        return response.data.pedidos;
    } catch (error) {
        console.error('Error al obtener pedidos:', error);
        throw error;
    }
};

export const crearPedido = async (pedido) => {
    try {
        const response = await axios.post(`${API_URL}/pedidos`, pedido);
        return response.data;
    } catch (error) {
        console.error('Error al crear pedido:', error);
        throw error;
    }
};

export const actualizarEstadoPedido = async (id, estado) => {
    try {
        const response = await axios.put(`${API_URL}/pedidos/${id}/estado`, { estado });
        return response.data;
    } catch (error) {
        console.error('Error al actualizar estado:', error);
        throw error;
    }
};

export const obtenerPedidosPorCliente = async (ci) => {
    try {
        const response = await axios.get(`${API_URL}/pedidos/cliente/${ci}`);
        return response.data.pedidos;
    } catch (error) {
        console.error('Error al obtener pedidos del cliente:', error);
        throw error;
    }
};


export const obtenerDetallesPedido = async (idPedido) => {
    try {
        const response = await axios.get(`${API_URL}/pedido-detalles/pedido/${idPedido}`);
        return response.data.detalles || [];
    } catch (error) {
        console.error('Error al obtener detalles del pedido:', error);
        return [];
    }
};

export const obtenerPedidoPorId = async (idPedido) => {
    try {
        const response = await axios.get(`${API_URL}/pedidos/${idPedido}`);
        return response.data.pedido;
    } catch (error) {
        console.error('Error al obtener pedido por ID:', error);
        throw error;
    }
};