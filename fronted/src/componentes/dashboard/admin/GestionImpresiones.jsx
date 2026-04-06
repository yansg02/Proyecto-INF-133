import { useState, useEffect } from 'react';
import { obtenerFacturas } from '../../../servicios/facturaService.js';
import { obtenerDetallesPedido } from '../../../servicios/pedidoService.js';
import { generarFacturaPDF } from '../../../servicios/pdfService.js';

function GestionImpresiones() {
    const [facturas, setFacturas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [filtroFecha, setFiltroFecha] = useState('');
    const [procesando, setProcesando] = useState(false);

    useEffect(() => {
        cargarFacturas();
    }, []);

    const cargarFacturas = async () => {
        try {
            const facturasData = await obtenerFacturas();
            setFacturas(facturasData);
        } catch (error) {
            console.error('Error cargando facturas:', error);
            alert('Error al cargar las facturas');
        } finally {
            setCargando(false);
        }
    };

    const handleVerPDF = async (factura) => {
        try {
            setProcesando(true);
            console.log(`Generando PDF para factura #${factura.idFactura}`);
            
            let detalles = [];
            try {
                detalles = await obtenerDetallesPedido(factura.idPedido);
                console.log('Detalles obtenidos:', detalles);
                
                if (!detalles || detalles.length === 0) {
                    console.log('No hay detalles, usando datos básicos');
                    detalles = [{
                        nombreP: 'Producto general',
                        cantidad: 1,
                        precio: factura.total,
                        subtotal: factura.total
                    }];
                }
            } catch (error) {
                console.warn('Error obteniendo detalles:', error);
                detalles = [{
                    nombreP: 'Producto general',
                    cantidad: 1,
                    precio: factura.total,
                    subtotal: factura.total
                }];
            }
            
            await generarFacturaPDF(factura, detalles);
            console.log('PDF generado exitosamente');
            
        } catch (error) {
            console.error('Error generando PDF:', error);
            alert('Error al generar el PDF: ' + error.message);
        } finally {
            setProcesando(false);
        }
    };

    const facturasFiltradas = filtroFecha
        ? facturas.filter(f => {
            const fechaFactura = new Date(f.fechaFactura).toISOString().split('T')[0];
            return fechaFactura === filtroFecha;
        })
        : facturas;

    const totalVentas = facturasFiltradas.reduce((sum, f) => sum + parseFloat(f.total || 0), 0);

    if (cargando) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando facturas...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            {}
            {procesando && (
                <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center" style={{zIndex: 1050}}>
                    <div className="bg-white p-4 rounded shadow">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Generando PDF...</span>
                        </div>
                        <p className="mt-2 mb-0">Generando documento, por favor espere...</p>
                    </div>
                </div>
            )}

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Gestión de Impresiones</h2>
                <div className="d-flex gap-2">
                    <input
                        type="date"
                        className="form-control"
                        value={filtroFecha}
                        onChange={(e) => setFiltroFecha(e.target.value)}
                        style={{ width: '180px' }}
                    />
                    {filtroFecha && (
                        <button
                            className="btn btn-secondary"
                            onClick={() => setFiltroFecha('')}
                            disabled={procesando}
                        >
                            Limpiar
                        </button>
                    )}
                </div>
            </div>

            {}
            <div className="row mb-4">
                <div className="col-md-6 mb-3">
                    <div className="card text-white bg-primary">
                        <div className="card-body">
                            <h5 className="card-title">Total Facturas</h5>
                            <h2>{facturasFiltradas.length}</h2>
                            <p className="card-text">facturas disponibles</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mb-3">
                    <div className="card text-white bg-success">
                        <div className="card-body">
                            <h5 className="card-title">Ventas Totales</h5>
                            <h2>Bs. {totalVentas.toFixed(2)}</h2>
                            <p className="card-text">monto total</p>
                        </div>
                    </div>
                </div>
            </div>

            {}
            <div className="card shadow">
                <div className="card-header bg-light">
                    <h5 className="mb-0">Facturas Disponibles para Impresión</h5>
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
                                                {factura.nombre || 'N/A'} {factura.apPaterno || ''}
                                                <br />
                                                <small className="text-muted">{factura.ci_cliente || 'Sin CI'}</small>
                                            </td>
                                            <td>
                                                {new Date(factura.fechaFactura).toLocaleDateString()}
                                                <br />
                                                <small className="text-muted">
                                                    {new Date(factura.fechaFactura).toLocaleTimeString()}
                                                </small>
                                            </td>
                                            <td>
                                                <strong className="text-success">
                                                    Bs. {parseFloat(factura.total).toFixed(2)}
                                                </strong>
                                            </td>
                                            <td>
                                                <div className="btn-group btn-group-sm">
                                                    <button
                                                        className="btn btn-outline-primary"
                                                        onClick={() => handleVerPDF(factura)}
                                                        disabled={procesando}
                                                    >
                                                        Generar PDF
                                                    </button>
                                                    <button
                                                        className="btn btn-outline-success"
                                                        onClick={async () => {
                                                            await handleVerPDF(factura);
                                                            setTimeout(() => window.print(), 1000);
                                                        }}
                                                        disabled={procesando}
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

            {}
            <div className="card mt-4 border-info">
                <div className="card-header bg-info text-white">
                    <h6 className="mb-0">ℹInstrucciones</h6>
                </div>
                <div className="card-body">
                    <p><strong>Generar PDF:</strong> Descarga la factura en formato PDF</p>
                    <p><strong>Imprimir:</strong> Genera el PDF y abre el diálogo de impresión</p>
                    <p className="mb-0 text-muted">
                        <small>Si no hay detalles específicos del pedido, se generará una factura con información básica.</small>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default GestionImpresiones;