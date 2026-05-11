import express from 'express';
import {
    crearUsuario,
    obtenerUsuarios,
    obtenerUsuario,
    login,
    verificarUsuario,
    actualizarUsuario,
    eliminarUsuario
} from '../controladores/usuarioControlador.js';

const router = express.Router();

router.post('/', crearUsuario);           
router.get('/', obtenerUsuarios);         
router.get('/:ci', obtenerUsuario);       
router.put('/:ci', actualizarUsuario);    
router.delete('/:ci', eliminarUsuario);   

router.post('/login', login);
router.get('/verificar/:usuario', verificarUsuario);

export default router;