import express from 'express';
import {
    crearPedidoCon,
    obtenerPedidos,
    obtenerPedido,
    pedidosPorCliente,
    cambiarEstado,
    eliminarPedido
} from '../controladores/pedidoControlador.js';

const router = express.Router();

router.post('/', crearPedidoCon);
router.get('/', obtenerPedidos);
router.get('/:id', obtenerPedido);
router.get('/cliente/:ci', pedidosPorCliente);
router.put('/:id/estado', cambiarEstado);
router.delete('/:id', eliminarPedido);

export default router;