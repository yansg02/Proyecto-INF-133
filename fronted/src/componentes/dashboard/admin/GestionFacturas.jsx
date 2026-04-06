import { useState, useEffect } from 'react';
import { obtenerFacturas, crearFactura } from '../../../servicios/facturaService.js';
import { obtenerPedidos } from '../../../servicios/pedidoService.js';

function GestionFacturas() {
    const [facturas, setFacturas] = useState([]);
    const [pedidos, setPedidos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [mostrarForm, setMostrarForm] = useState(false);
    const [formData, setFormData] = useState({
        idPedido: '',
        ci_cliente: '',
        total: '',
        metodoPago: 'EFECTIVO'
    });
    const [filtroFecha, setFiltroFecha] = useState('');

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        try {
            const [facturasData, pedidosData] = await Promise.all([
                obtenerFacturas(),
                obtenerPedidos()
            ]);
            
            const pedidosSinFactura = pedidosData.filter(p => 
                (p.estado === 'LISTO' || p.estado === 'ENTREGADO') && 
                !facturasData.some(f => f.idPedido === p.idPedido)
            );
            
            setFacturas(facturasData);
            setPedidos(pedidosSinFactura);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setCargando(false);
        }
    };

    const handleNuevaFactura = (pedido) => {
        setFormData({
            idPedido: pedido.idPedido,
            ci_cliente: pedido.ci_cliente,
            total: pedido.total || '0.00',
            metodoPago: 'EFECTIVO'
        });
        setMostrarForm(true);
    };

    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await crearFactura(formData);
            alert('Factura creada exitosamente');
            setMostrarForm(false);
            cargarDatos();
        } catch (error) {
            console.error('Error:', error);
            alert('Error al crear factura');
        }
    };

    const getMetodoPagoColor = (metodo) => {
        switch(metodo) {
            case 'EFECTIVO': return 'success';
            case 'TARJETA': return 'primary';
            case 'TRANSFERENCIA': return 'info';
            default: return 'secondary';
        }
    };

    const getMetodoPagoIcon = (metodo) => {
        switch(metodo) {
            case 'EFECTIVO': return '💰';
            case 'TARJETA': return '💳';
            case 'TRANSFERENCIA': return '🏦';
            default: return '📄';
        }
    };

    const facturasFiltradas = filtroFecha
        ? facturas.filter(f => f.fechaFactura.startsWith(filtroFecha))
        : facturas;

    const totalVentas = facturasFiltradas.reduce((sum, f) => sum + parseFloat(f.total || 0), 0);
    const ventasEfectivo = facturasFiltradas.filter(f => f.metodoPago === 'EFECTIVO').length;
    const ventasTarjeta = facturasFiltradas.filter(f => f.metodoPago === 'TARJETA').length;

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
                <h2>Gestión de Facturas</h2>
                <div className="d-flex gap-2">
                    <input
                        type="date"
                        className="form-control"
                        value={filtroFecha}
                        onChange={(e) => setFiltroFecha(e.target.value)}
                    />
                    {filtroFecha && (
                        <button 
                            className="btn btn-secondary"
                            onClick={() => setFiltroFecha('')}
                        >
                            Limpiar
                        </button>
                    )}
                </div>
            </div>

            {}
            <div className="row mb-4">
                <div className="col-md-4 mb-3">
                    <div className="card text-white bg-primary">
                        <div className="card-body">
                            <h5 className="card-title">Total Ventas</h5>
                            <h2>Bs. {totalVentas.toFixed(2)}</h2>
                            <p className="card-text">{facturasFiltradas.length} facturas</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card text-white bg-success">
                        <div className="card-body">
                            <h5 className="card-title">Efectivo</h5>
                            <h2>{ventasEfectivo}</h2>
                            <p className="card-text">ventas en efectivo</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card text-white bg-info">
                        <div className="card-body">
                            <h5 className="card-title">Tarjeta</h5>
                            <h2>{ventasTarjeta}</h2>
                            <p className="card-text">ventas con tarjeta</p>
                        </div>
                    </div>
                </div>
            </div>

            {}
            {mostrarForm && (
                <div className="card mb-4 shadow">
                    <div className="card-header bg-success text-white">
                        <h5 className="mb-0">Nueva Factura</h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">ID Pedido</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formData.idPedido}
                                        readOnly
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">CI Cliente</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formData.ci_cliente}
                                        readOnly
                                    />
                                </div>
                            </div>
                            
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Total</label>
                                    <div className="input-group">
                                        <span className="input-group-text">Bs.</span>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="total"
                                            value={formData.total}
                                            onChange={handleFormChange}
                                            step="0.01"
                                            min="0"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Método de Pago</label>
                                    <select
                                        className="form-select"
                                        name="metodoPago"
                                        value={formData.metodoPago}
                                        onChange={handleFormChange}
                                    >
                                        <option value="EFECTIVO">Efectivo</option>
                                        <option value="TARJETA">Tarjeta</option>
                                        <option value="TRANSFERENCIA">Transferencia</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div className="d-flex gap-2">
                                <button type="submit" className="btn btn-success">
                                    Generar Factura
                                </button>
                                <button 
                                    type="button" 
                                    className="btn btn-secondary"
                                    onClick={() => setMostrarForm(false)}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {}
            {pedidos.length > 0 && !mostrarForm && (
                <div className="card mb-4 shadow">
                    <div className="card-header bg-warning">
                        <h5 className="mb-0">Pedidos Listos para Facturar</h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            {pedidos.map(pedido => (
                                <div key={pedido.idPedido} className="col-md-6 mb-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-start">
                                                <div>
                                                    <strong>Pedido #{pedido.idPedido}</strong>
                                                    <br />
                                                    <small>Cliente: {pedido.nombre}</small>
                                                </div>
                                                <span className="badge bg-success">LISTO</span>
                                            </div>
                                            
                                            <div className="mt-2">
                                                <strong>Total:</strong> Bs. {pedido.total || '0.00'}
                                                <br />
                                                <strong>Fecha:</strong> {new Date(pedido.fechaPedido).toLocaleDateString()}
                                            </div>
                                            
                                            <button 
                                                className="btn btn-primary btn-sm mt-2 w-100"
                                                onClick={() => handleNuevaFactura(pedido)}
                                            >
                                                Crear Factura
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {}
            <div className="card shadow">
                <div className="card-header bg-light">
                    <h5 className="mb-0">Historial de Facturas</h5>
                </div>
                <div className="card-body">
                    {facturasFiltradas.length === 0 ? (
                        <div className="alert alert-info">
                            No hay facturas {filtroFecha ? `en la fecha ${filtroFecha}` : 'registradas'}
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead className="table-light">
                                    <tr>
                                        <th>Factura #</th>
                                        <th>Pedido #</th>
                                        <th>Cliente</th>
                                        <th>Fecha</th>
                                        <th>Total</th>
                                        <th>Método Pago</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {facturasFiltradas.map(factura => (
                                        <tr key={factura.idFactura}>
                                            <td>
                                                <strong>F-{factura.idFactura.toString().padStart(4, '0')}</strong>
                                            </td>
                                            <td>#{factura.idPedido}</td>
                                            <td>
                                                {factura.nombre} {factura.apPaterno}
                                                <br />
                                                <small className="text-muted">{factura.ci_cliente}</small>
                                            </td>
                                            <td>
                                                {new Date(factura.fechaFactura).toLocaleString()}
                                            </td>
                                            <td>
                                                <strong className="text-success">
                                                    Bs. {parseFloat(factura.total).toFixed(2)}
                                                </strong>
                                            </td>
                                            <td>
                                                <span className={`badge bg-${getMetodoPagoColor(factura.metodoPago)}`}>
                                                    {getMetodoPagoIcon(factura.metodoPago)} {factura.metodoPago}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="btn-group btn-group-sm">
                                                    <button 
                                                        className="btn btn-outline-primary"
                                                        onClick={() => {
                                                            
                                                            alert(`Factura #${factura.idFactura} - Próximamente: Ver PDF`);
                                                        }}
                                                    >
                                                        Ver
                                                    </button>
                                                    <button 
                                                        className="btn btn-outline-secondary"
                                                        onClick={() => {
                                                            
                                                            alert(`Reimprimir factura #${factura.idFactura}`);
                                                        }}
                                                    >
                                                        Imprimir
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default GestionFacturas;