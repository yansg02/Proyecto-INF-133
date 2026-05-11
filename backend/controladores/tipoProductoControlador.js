import * as modelo from '../modelos/tipoProductoModelo.js';

export const crearTipoProducto = async (req, res) => {
    try {
        const tipoProducto = req.body;
        await modelo.crearTipoProducto(tipoProducto);
        res.json({ ok: true, mensaje: 'Tipo de producto creado' });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ ok: false, mensaje: 'Error al crear tipo de producto' });
    }
};

export const obtenerTiposProducto = async (req, res) => {
    try {
        const tiposProducto = await modelo.obtenerTiposProducto();
        res.json({ ok: true, tiposProducto });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ ok: false, mensaje: 'Error al obtener tipos de producto' });
    }
};

export const obtenerTipoProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const tipoProducto = await modelo.obtenerTipoProductoPorId(id);
        if (!tipoProducto) return res.status(404).json({ ok: false, mensaje: 'Tipo de producto no encontrado' });
        res.json({ ok: true, tipoProducto });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ ok: false, mensaje: 'Error al obtener tipo de producto' });
    }
};

export const actualizarTipoProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const datos = req.body;
        await modelo.actualizarTipoProducto(id, datos);
        res.json({ ok: true, mensaje: 'Tipo de producto actualizado' });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ ok: false, mensaje: 'Error al actualizar' });
    }
};

export const actualizarStock = async (req, res) => {
    try {
        const { id } = req.params;
        const { cantidad } = req.body;
        await modelo.actualizarStock(id, cantidad);
        res.json({ ok: true, mensaje: 'Stock actualizado' });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ ok: false, mensaje: 'Error al actualizar stock' });
    }
};

export const eliminarTipoProducto = async (req, res) => {
    try {
        const { id } = req.params;
        await modelo.eliminarTipoProducto(id);
        res.json({ ok: true, mensaje: 'Tipo de producto eliminado' });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ ok: false, mensaje: 'Error al eliminar' });
    }
};
