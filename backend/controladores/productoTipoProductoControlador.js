import * as modelo from '../modelos/productoTipoProductoModelo.js';

export const agregarTipoProducto = async (req, res) => {
    try {
        const datos = req.body;
        await modelo.agregarTipoProductoAProducto(datos);
        res.json({ ok: true, mensaje: 'Tipo de producto agregado' });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ ok: false, mensaje: 'Error al agregar tipo de producto' });
    }
};

export const obtenerTiposProductoDeProducto = async (req, res) => {
    try {
        const { idProducto } = req.params;
        const tipos = await modelo.obtenerTiposProductoDeProducto(idProducto);
        res.json({ ok: true, tipos });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ ok: false, mensaje: 'Error al obtener tipos de producto' });
    }
};

export const eliminarTipoProductoDeProducto = async (req, res) => {
    try {
        const { idProducto, idTipoProducto } = req.params;
        await modelo.eliminarTipoProductoDeProducto(idProducto, idTipoProducto);
        res.json({ ok: true, mensaje: 'Tipo de producto eliminado' });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ ok: false, mensaje: 'Error al eliminar tipo de producto' });
    }
};
