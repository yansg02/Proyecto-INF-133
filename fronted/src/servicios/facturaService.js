import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const obtenerFacturas = async () => {
    try {
        const response = await axios.get(`${API_URL}/facturas`);
        return response.data.facturas;
    } catch (error) {
        console.error('Error al obtener facturas:', error);
        throw error;
    }
};

export const crearFactura = async (factura) => {
    try {
        const response = await axios.post(`${API_URL}/facturas`, factura);
        return response.data;
    } catch (error) {
        console.error('Error al crear factura:', error);
        throw error;
    }
};

export const obtenerFacturasPorCliente = async (ci) => {
    try {
        const response = await axios.get(`${API_URL}/facturas/cliente/${ci}`);
        return response.data.facturas;
    } catch (error) {
        console.error('Error al obtener facturas del cliente:', error);
        throw error;
    }
};