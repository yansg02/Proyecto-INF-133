import express from 'express';
import {
    crearTipoProducto,
    obtenerTiposProducto,
    obtenerTipoProducto,
    actualizarTipoProducto,
    actualizarStock,
    eliminarTipoProducto
} from '../controladores/tipoProductoControlador.js';

const router = express.Router();

router.post('/', crearTipoProducto);
router.get('/', obtenerTiposProducto);
router.get('/:id', obtenerTipoProducto);
router.put('/:id', actualizarTipoProducto);
router.put('/:id/stock', actualizarStock);
router.delete('/:id', eliminarTipoProducto);

export default router;
