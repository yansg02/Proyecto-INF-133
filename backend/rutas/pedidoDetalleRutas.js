import express from 'express';
import {
    crearDetalle,
    obtenerDetalles
} from '../controladores/pedidoDetalleControlador.js';

const router = express.Router();

router.post('/', crearDetalle);
router.get('/pedido/:idPedido', obtenerDetalles);

export default router;