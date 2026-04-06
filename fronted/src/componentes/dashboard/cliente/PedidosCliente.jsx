import { useState, useEffect } from 'react';
import { obtenerPedidos } from '../../../servicios/pedidoService';

function PedidosCliente() {
    const [pedidos, setPedidos] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        cargarPedidos();
    }, []);

    const cargarPedidos = async () => {
        try {

            const usuario = JSON.parse(localStorage.getItem('usuario'));
            const data = await obtenerPedidos();

            const pedidosCliente = data.filter(p => p.ci_cliente === usuario.ci);
            setPedidos(pedidosCliente);
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

    if (cargando) return <div>Cargando pedidos...</div>;

    return (
        <div className="container mt-4">
            <h2>Mis Pedidos</h2>
            
            {pedidos.length === 0 ? (
                <div className="alert alert-info">
                    No tienes pedidos realizados
                </div>
            ) : (
                <div className="row">
                    {pedidos.map(pedido => (
                        <div key={pedido.idPedido} className="col-md-6 mb-3">
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <span>Pedido #{pedido.idPedido}</span>
                                    <span className="badge bg-secondary">
                                        {new Date(pedido.fechaPedido).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="card-body">
                                    <p><strong>Total:</strong> Bs. {pedido.total || '0.00'}</p>
                                    <p><strong>Observaciones:</strong> {pedido.observaciones || 'Ninguna'}</p>
                                    <span className={`badge bg-${getEstadoColor(pedido.estado)}`}>
                                        {pedido.estado}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
            <button 
                className="btn btn-primary mt-3"
                onClick={() => window.location.href = '/menu'}
            >
                Hacer nuevo pedido
            </button>
        </div>
    );
}

export default PedidosCliente;