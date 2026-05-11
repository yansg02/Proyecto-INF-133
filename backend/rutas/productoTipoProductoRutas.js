import express from 'express';
import {
    agregarTipoProducto,
    obtenerTiposProductoDeProducto,
    eliminarTipoProductoDeProducto
} from '../controladores/productoTipoProductoControlador.js';

const router = express.Router();

router.post('/', agregarTipoProducto);
router.get('/producto/:idProducto', obtenerTiposProductoDeProducto);
router.delete('/:idProducto/:idTipoProducto', eliminarTipoProductoDeProducto);

export default router;
