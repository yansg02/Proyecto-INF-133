import express from 'express';
import {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    eliminarProducto,
    productosPorCategoria
} from '../controladores/productoControlador.js';

const router = express.Router();

router.post('/', crearProducto);
router.get('/', obtenerProductos);
router.get('/:id', obtenerProducto);
router.put('/:id', actualizarProducto);
router.delete('/:id', eliminarProducto);
router.get('/categoria/:categoria', productosPorCategoria);

export default router;