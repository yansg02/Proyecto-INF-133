import * as modelo from '../modelos/pedidoModelo.js';

export const crearPedidoCon = async (req, res) => {
    try {
        const pedido = req.body;
        await modelo.crearPedido(pedido);
        res.json({ ok: true, mensaje: 'Pedido creado' });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ ok: false, mensaje: 'Error al crear pedido' });
    }
};

export const obtenerPedidos = async (req, res) => {
    try {
        const pedidos = await modelo.obtenerPedidos();
        res.json({ ok: true, pedidos });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ ok: false, mensaje: 'Error al obtener pedidos' });
    }
};

export const obtenerPedido = async (req, res) => {
    try {
        const { id } = req.params;
        const pedido = await modelo.obtenerPedidoPorId(id);
        if (!pedido) return res.status(404).json({ ok: false, mensaje: 'Pedido no encontrado' });
        res.json({ ok: true, pedido });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ ok: false, mensaje: 'Error al obtener pedido' });
    }
};

export const pedidosPorCliente = async (req, res) => {
    try {
        const { ci } = req.params;
        const pedidos = await modelo.obtenerPedidosPorCliente(ci);
        res.json({ ok: true, pedidos });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ ok: false, mensaje: 'Error al obtener pedidos' });
    }
};

export const cambiarEstado = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        await modelo.actualizarEstadoPedido(id, estado);
        res.json({ ok: true, mensaje: 'Estado actualizado' });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ ok: false, mensaje: 'Error al cambiar estado' });
    }
};

export const eliminarPedido = async (req, res) => {
    try {
        const { id } = req.params;
        await modelo.eliminarPedido(id);
        res.json({ ok: true, mensaje: 'Pedido eliminado' });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ ok: false, mensaje: 'Error al eliminar' });
    }
};