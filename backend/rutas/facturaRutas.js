import express from 'express';
import {
    crearFactura,
    obtenerFacturas,
    obtenerFactura,
    facturasPorCliente
} from '../controladores/facturaControlador.js';

const router = express.Router();

router.post('/', crearFactura);
router.get('/', obtenerFacturas);
router.get('/:id', obtenerFactura);
router.get('/cliente/:ci', facturasPorCliente);

export default router;