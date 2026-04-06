import { useState, useEffect } from 'react';
import { obtenerPedidosPorCliente } from '../../../servicios/pedidoService';
import { obtenerFacturasPorCliente } from '../../../servicios/facturaService';

function MisPedidos() {
    const [pedidos, setPedidos] = useState([]);
    const [facturas, setFacturas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const usuarioData = JSON.parse(localStorage.getItem('usuario'));
        if (usuarioData) {
            setUsuario(usuarioData);
            cargarDatos(usuarioData.ci);
        }
    }, []);

    const cargarDatos = async (ci) => {
        try {
            const [pedidosData, facturasData] = await Promise.all([
                obtenerPedidosPorCliente(ci),
                obtenerFacturasPorCliente(ci)
            ]);
            setPedidos(pedidosData);
            setFacturas(facturasData);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setCargando(false);
        }
    };

    const getEstadoColor = (estado) => {
        switch(estado) {
            case 'ENTREGADO': return 'success';
            case 'PREPARANDO': return 'warning';
            case 'LISTO': return 'info';
            case 'CANCELADO': return 'danger';
            default: return 'secondary';
        }
    };

    if (cargando) return <div className="text-center p-5">Cargando...</div>;
    if (!usuario) return <div>No hay usuario logueado</div>;

    return (
        <div className="container mt-4">
            <h2>📋 Mis Pedidos</h2>
            <p className="text-muted">Bienvenido, {usuario.nombre}</p>

            {pedidos.length === 0 ? (
                <div className="alert alert-info">
                    No tienes pedidos realizados. ¡Haz tu primer pedido!
                </div>
            ) : (
                <div className="row">
                    {pedidos.map(pedido => (
                        <div key={pedido.idPedido} className="col-md-6 mb-3">
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <strong>Pedido #{pedido.idPedido}</strong>
                                    <span className={`badge bg-${getEstadoColor(pedido.estado)}`}>
                                        {pedido.estado}
                                    </span>
                                </div>
                                <div className="card-body">
                                    <p><strong>Fecha:</strong> {new Date(pedido.fechaPedido).toLocaleDateString()}</p>
                                    <p><strong>Total:</strong> Bs. {pedido.total || '0.00'}</p>
                                    {pedido.observaciones && (
                                        <p><strong>Observaciones:</strong> {pedido.observaciones}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <h3 className="mt-5">🧾 Mis Facturas</h3>
            {facturas.length === 0 ? (
                <div className="alert alert-info">
                    No tienes facturas generadas
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Factura #</th>
                                <th>Fecha</th>
                                <th>Total</th>
                                <th>Método de Pago</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {facturas.map(factura => (
                                <tr key={factura.idFactura}>
                                    <td>F-{factura.idFactura}</td>
                                    <td>{new Date(factura.fechaFactura).toLocaleDateString()}</td>
                                    <td className="text-success">Bs. {factura.total}</td>
                                    <td>
                                        <span className="badge bg-info">{factura.metodoPago}</span>
                                    </td>
                                    <td>
                                        <button className="btn btn-sm btn-outline-primary">
                                            Descargar PDF
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="text-center mt-4">
                <button 
                    className="btn btn-primary"
                    onClick={() => window.location.href = '/menu'}
                >
                    🍔 Hacer nuevo pedido
                </button>
            </div>
        </div>
    );
}

export default MisPedidos;