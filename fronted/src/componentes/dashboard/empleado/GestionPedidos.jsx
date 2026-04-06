import { useState, useEffect } from 'react';
import { obtenerPedidos, actualizarEstadoPedido } from '../../../servicios/pedidoService';

function GestionPedidos() {
    const [pedidos, setPedidos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [filtroEstado, setFiltroEstado] = useState('TODOS');

    useEffect(() => {
        cargarPedidos();
    }, []);

    const cargarPedidos = async () => {
        try {
            const data = await obtenerPedidos();
            setPedidos(data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setCargando(false);
        }
    };

    const handleCambiarEstado = async (id, nuevoEstado) => {
        try {
            await actualizarEstadoPedido(id, nuevoEstado);
            alert(`✅ Pedido #${id} actualizado a: ${nuevoEstado}`);
            cargarPedidos();
        } catch (error) {
            console.error('Error:', error);
            alert('❌ Error al actualizar estado');
        }
    };

    const getEstadoColor = (estado) => {
        switch(estado) {
            case 'PENDIENTE': return 'warning';
            case 'PREPARANDO': return 'info';
            case 'LISTO': return 'success';
            case 'ENTREGADO': return 'primary';
            case 'CANCELADO': return 'danger';
            default: return 'secondary';
        }
    };

    const getEstadoIcon = (estado) => {
        switch(estado) {
            case 'PENDIENTE': return '⏳';
            case 'PREPARANDO': return '👨‍🍳';
            case 'LISTO': return '✅';
            case 'ENTREGADO': return '🚚';
            case 'CANCELADO': return '❌';
            default: return '📋';
        }
    };

    const pedidosFiltrados = filtroEstado === 'TODOS' 
        ? pedidos 
        : pedidos.filter(p => p.estado === filtroEstado);

    if (cargando) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>📋 Gestión de Pedidos</h2>
                <div className="d-flex gap-2">
                    <select 
                        className="form-select w-auto"
                        value={filtroEstado}
                        onChange={(e) => setFiltroEstado(e.target.value)}
                    >
                        <option value="TODOS">Todos los pedidos</option>
                        <option value="PENDIENTE">Pendientes</option>
                        <option value="PREPARANDO">En preparación</option>
                        <option value="LISTO">Listos</option>
                        <option value="ENTREGADO">Entregados</option>
                        <option value="CANCELADO">Cancelados</option>
                    </select>
                </div>
            </div>

            {}
            <div className="row mb-4">
                <div className="col-md-2 col-6 mb-3">
                    <div className="card border-warning">
                        <div className="card-body text-center">
                            <h5 className="text-warning">⏳</h5>
                            <h3>{pedidos.filter(p => p.estado === 'PENDIENTE').length}</h3>
                            <p className="text-muted mb-0">Pendientes</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-2 col-6 mb-3">
                    <div className="card border-info">
                        <div className="card-body text-center">
                            <h5 className="text-info"></h5>
                            <h3>{pedidos.filter(p => p.estado === 'PREPARANDO').length}</h3>
                            <p className="text-muted mb-0">Preparando</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-2 col-6 mb-3">
                    <div className="card border-success">
                        <div className="card-body text-center">
                            <h5 className="text-success"></h5>
                            <h3>{pedidos.filter(p => p.estado === 'LISTO').length}</h3>
                            <p className="text-muted mb-0">Listos</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-2 col-6 mb-3">
                    <div className="card border-primary">
                        <div className="card-body text-center">
                            <h5 className="text-primary"></h5>
                            <h3>{pedidos.filter(p => p.estado === 'ENTREGADO').length}</h3>
                            <p className="text-muted mb-0">Entregados</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-2 col-6 mb-3">
                    <div className="card border-danger">
                        <div className="card-body text-center">
                            <h5 className="text-danger"></h5>
                            <h3>{pedidos.filter(p => p.estado === 'CANCELADO').length}</h3>
                            <p className="text-muted mb-0">Cancelados</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-2 col-6 mb-3">
                    <div className="card border-secondary">
                        <div className="card-body text-center">
                            <h5 className="text-secondary">📊</h5>
                            <h3>{pedidos.length}</h3>
                            <p className="text-muted mb-0">Total</p>
                        </div>
                    </div>
                </div>
            </div>

            {}
            {pedidosFiltrados.length === 0 ? (
                <div className="alert alert-info">
                    No hay pedidos {filtroEstado !== 'TODOS' ? `con estado "${filtroEstado}"` : ''}
                </div>
            ) : (
                <div className="row">
                    {pedidosFiltrados.map(pedido => (
                        <div key={pedido.idPedido} className="col-md-6 mb-3">
                            <div className="card h-100 shadow-sm">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <div>
                                        <strong>Pedido #{pedido.idPedido}</strong>
                                        <br />
                                        <small className="text-muted">
                                            {new Date(pedido.fechaPedido).toLocaleString()}
                                        </small>
                                    </div>
                                    <span className={`badge bg-${getEstadoColor(pedido.estado)}`}>
                                        {getEstadoIcon(pedido.estado)} {pedido.estado}
                                    </span>
                                </div>
                                
                                <div className="card-body">
                                    <div className="mb-3">
                                        <strong>👤 Cliente:</strong> {pedido.nombre} {pedido.apPaterno}
                                        <br />
                                        <small>CI: {pedido.ci_cliente}</small>
                                    </div>
                                    
                                    <div className="mb-3">
                                        <strong>Total:</strong> Bs. {pedido.total || '0.00'}
                                    </div>
                                    
                                    {pedido.observaciones && (
                                        <div className="mb-3">
                                            <strong>Observaciones:</strong>
                                            <p className="mb-0">{pedido.observaciones}</p>
                                        </div>
                                    )}
                                    
                                    {}
                                    <div className="btn-group w-100">
                                        {pedido.estado === 'PENDIENTE' && (
                                            <>
                                                <button 
                                                    className="btn btn-sm btn-info"
                                                    onClick={() => handleCambiarEstado(pedido.idPedido, 'PREPARANDO')}
                                                >
                                                    Preparar
                                                </button>
                                                <button 
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => {
                                                        if (window.confirm('¿Cancelar este pedido?')) {
                                                            handleCambiarEstado(pedido.idPedido, 'CANCELADO');
                                                        }
                                                    }}
                                                >
                                                    Cancelar
                                                </button>
                                            </>
                                        )}
                                        
                                        {pedido.estado === 'PREPARANDO' && (
                                            <button 
                                                className="btn btn-sm btn-success"
                                                onClick={() => handleCambiarEstado(pedido.idPedido, 'LISTO')}
                                            >
                                                Listo
                                            </button>
                                        )}
                                        
                                        {pedido.estado === 'LISTO' && (
                                            <button 
                                                className="btn btn-sm btn-primary"
                                                onClick={() => handleCambiarEstado(pedido.idPedido, 'ENTREGADO')}
                                            >
                                                Entregar
                                            </button>
                                        )}
                                        
                                        {pedido.estado === 'ENTREGADO' && (
                                            <span className="text-success">Pedido completado</span>
                                        )}
                                        
                                        {pedido.estado === 'CANCELADO' && (
                                            <span className="text-danger">Pedido cancelado</span>
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

export default GestionPedidos;