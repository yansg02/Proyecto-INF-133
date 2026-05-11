import * as modelo from '../modelos/pedidoDetalleModelo.js';

export const crearDetalle = async (req, res) => {
    try {
        const detalle = req.body;
        await modelo.crearDetallePedido(detalle);
        res.json({ ok: true, mensaje: 'Detalle agregado' });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ ok: false, mensaje: 'Error al agregar detalle' });
    }
};

export const obtenerDetalles = async (req, res) => {
    try {
        const { idPedido } = req.params;
        const detalles = await modelo.obtenerDetallesPorPedido(idPedido);
        res.json({ ok: true, detalles });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ ok: false, mensaje: 'Error al obtener detalles' });
    }
};