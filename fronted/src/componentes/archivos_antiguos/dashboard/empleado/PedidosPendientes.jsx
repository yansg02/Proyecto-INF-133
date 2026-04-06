import { useState, useEffect } from 'react';
import { obtenerPedidos, actualizarEstadoPedido } from '../../../servicios/pedidoService';

function PedidosPendientes() {
    const [pedidos, setPedidos] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        cargarPedidos();
    }, []);

    const cargarPedidos = async () => {
        try {
            const data = await obtenerPedidos();
            const pendientes = data.filter(p => p.estado === 'PENDIENTE' || p.estado === 'PREPARANDO');
            setPedidos(pendientes);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setCargando(false);
        }
    };

    const handleCambiarEstado = async (id, nuevoEstado) => {
        try {
            await actualizarEstadoPedido(id, nuevoEstado);
            alert('Estado actualizado');
            cargarPedidos();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (cargando) return <div>Cargando...</div>;

    return (
        <div className="container mt-4">
            <h2>Pedidos Pendientes</h2>
            {pedidos.length === 0 ? (
                <div className="alert alert-success">No hay pedidos pendientes</div>
            ) : (
                <div className="row">
                    {pedidos.map(pedido => (
                        <div key={pedido.idPedido} className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-header">Pedido #{pedido.idPedido} - Cliente: {pedido.nombre}</div>
                                <div className="card-body">
                                    <p><strong>Total:</strong> Bs. {pedido.total || '0.00'}</p>
                                    <p><strong>Estado actual:</strong>
                                        <span className={`badge ms-2 ${pedido.estado === 'PENDIENTE' ? 'bg-warning' : 'bg-info'}`}>
                                            {pedido.estado}
                                        </span>
                                    </p>
                                    <div className="btn-group mt-2">
                                        {pedido.estado === 'PENDIENTE' && (
                                            <>
                                                <button className="btn btn-sm btn-info" onClick={() => handleCambiarEstado(pedido.idPedido, 'PREPARANDO')}>En Preparación</button>
                                                <button className="btn btn-sm btn-danger" onClick={() => handleCambiarEstado(pedido.idPedido, 'CANCELADO')}>Cancelar</button>
                                            </>
                                        )}
                                        {pedido.estado === 'PREPARANDO' && (
                                            <button className="btn btn-sm btn-success" onClick={() => handleCambiarEstado(pedido.idPedido, 'LISTO')}>Marcar como Listo</button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default PedidosPendientes;
