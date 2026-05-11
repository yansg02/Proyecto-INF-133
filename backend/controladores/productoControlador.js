import * as modelo from '../modelos/productoModelo.js';

export const crearProducto = async (req, res) => {
    try {
        const producto = req.body;
        await modelo.crearProducto(producto);
        res.json({ ok: true, mensaje: 'Producto creado' });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ ok: false, mensaje: 'Error al crear producto' });
    }
};

export const obtenerProductos = async (req, res) => {
    try {
        const productos = await modelo.obtenerProductos();
        res.json({ ok: true, productos });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ ok: false, mensaje: 'Error al obtener productos' });
    }
};

export const obtenerProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await modelo.obtenerProductoPorId(id);
        if (!producto) return res.status(404).json({ ok: false, mensaje: 'Producto no encontrado' });
        res.json({ ok: true, producto });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ ok: false, mensaje: 'Error al obtener producto' });
    }
};

export const actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const datos = req.body;
        await modelo.actualizarProducto(id, datos);
        res.json({ ok: true, mensaje: 'Producto actualizado' });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ ok: false, mensaje: 'Error al actualizar' });
    }
};

export const eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        await modelo.eliminarProducto(id);
        res.json({ ok: true, mensaje: 'Producto eliminado' });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ ok: false, mensaje: 'Error al eliminar' });
    }
};

export const productosPorCategoria = async (req, res) => {
    try {
        const { categoria } = req.params;
        const productos = await modelo.buscarProductosPorCategoria(categoria);
        res.json({ ok: true, productos });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ ok: false, mensaje: 'Error al buscar' });
    }
};