import express from 'express';
import {
    agregarIngrediente,
    obtenerIngredientesProducto,
    eliminarIngredienteProducto
} from '../controladores/productoIngredienteControlador.js';

const router = express.Router();

router.post('/', agregarIngrediente);
router.get('/producto/:idProducto', obtenerIngredientesProducto);
router.delete('/:idProducto/:idIngrediente', eliminarIngredienteProducto);

export default router;