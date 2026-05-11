import express from 'express';
import cors from 'cors';

import usuarioRutas from './rutas/usuarioRutas.js';
import productoRutas from './rutas/productoRutas.js';
import pedidoRutas from './rutas/pedidoRutas.js';
import pedidoDetalleRutas from './rutas/pedidoDetalleRutas.js';
import facturaRutas from './rutas/facturaRutas.js';
import tipoProductoRutas from './rutas/tipoProductoRutas.js';
import productoTipoProductoRutas from './rutas/productoTipoProductoRutas.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/api/usuarios', usuarioRutas);
app.use('/api/productos', productoRutas);
app.use('/api/pedidos', pedidoRutas);
app.use('/api/pedido-detalles', pedidoDetalleRutas);
app.use('/api/facturas', facturaRutas);
app.use('/api/tipos-producto', tipoProductoRutas);
app.use('/api/producto-tipos', productoTipoProductoRutas);

app.get('/', (req, res) => {
    res.json({ mensaje: 'API Papelería Lapizito funcionando', rutas: ['/api/usuarios', '/api/usuarios/login'] });
});

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});