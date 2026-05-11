import * as modelo from '../modelos/facturaModelo.js';

export const crearFactura = async (req, res) => {
    try {
        const factura = req.body;
        await modelo.crearFactura(factura);
        res.json({ ok: true, mensaje: 'Factura creada' });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ ok: false, mensaje: 'Error al crear factura' });
    }
};

export const obtenerFacturas = async (req, res) => {
    try {
        const facturas = await modelo.obtenerFacturas();
        res.json({ ok: true, facturas });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ ok: false, mensaje: 'Error al obtener facturas' });
    }
};

export const obtenerFactura = async (req, res) => {
    try {
        const { id } = req.params;
        const factura = await modelo.obtenerFacturaPorId(id);
        if (!factura) return res.status(404).json({ ok: false, mensaje: 'Factura no encontrada' });
        res.json({ ok: true, factura });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ ok: false, mensaje: 'Error al obtener factura' });
    }
};

export const facturasPorCliente = async (req, res) => {
    try {
        const { ci } = req.params;
        const facturas = await modelo.obtenerFacturasPorCliente(ci);
        res.json({ ok: true, facturas });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ ok: false, mensaje: 'Error al obtener facturas' });
    }
};