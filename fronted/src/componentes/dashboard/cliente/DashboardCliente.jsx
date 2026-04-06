import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerProductos } from '../../../servicios/productoService';
import '../../../styles/dashBoars.css';

function DashboardCliente() {
    const [usuario, setUsuario] = useState(null);
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const usuarioData = JSON.parse(localStorage.getItem('usuario'));
        
        if (!usuarioData || usuarioData.rol !== 'CLIENTE') {
            navigate('/login');
            return;
        }
        
        setUsuario(usuarioData);
        cargarProductos();
    }, [navigate]);

    const cargarProductos = async () => {
        try {
            const data = await obtenerProductos();
            setProductos(data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setCargando(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('usuario');
        navigate('/');
    };

    if (!usuario) return <div className="text-center p-5">Cargando...</div>;

    if (cargando) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '500px' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-cliente d-flex flex-column min-vh-100">
            {}
            <div className="bg-primary text-white p-4">
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h1>Bienvenido, {usuario.nombre}</h1>
                            <p className="mb-0">Papelería Lapizito</p>
                        </div>
                        <button onClick={handleLogout} className="btn btn-light">
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </div>

            {}
            <div className="flex-grow-1 p-4">
                <div className="container">
                    {}
                    <div className="row mb-4">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Mi Información</h5>
                                    <p><strong>Nombre:</strong> {usuario.nombre} {usuario.apPaterno}</p>
                                    <p><strong>CI:</strong> {usuario.ci}</p>
                                    <p><strong>Email:</strong> {usuario.email}</p>
                                    <p><strong>Teléfono:</strong> {usuario.telefono || 'No registrado'}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Acciones Rápidas</h5>
                                    <button className="btn btn-primary w-100 mb-2">
                                        📋 Ver mis Pedidos
                                    </button>
                                    <button className="btn btn-success w-100 mb-2">
                                        🛒 Realizar Compra
                                    </button>
                                    <button className="btn btn-info w-100">
                                        ⚙️ Editar Perfil
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {}
                    <div className="card">
                        <div className="card-header bg-light">
                            <h5 className="mb-0">Catálogo de Productos</h5>
                        </div>
                        <div className="card-body">
                            {productos.length === 0 ? (
                                <div className="alert alert-info">
                                    No hay productos disponibles en este momento
                                </div>
                            ) : (
                                <div className="row g-3">
                                    {productos.map(producto => (
                                        <div key={producto.idProducto} className="col-md-4 col-lg-3">
                                            <div className="card h-100 shadow-sm">
                                                <div className="card-body">
                                                    <h6 className="card-title">{producto.nombreP}</h6>
                                                    <p className="card-text text-muted small">
                                                        {producto.descripcion?.substring(0, 50)}...
                                                    </p>
                                                    <p className="mb-2">
                                                        <span className="badge bg-success">
                                                            Bs. {parseFloat(producto.precio).toFixed(2)}
                                                        </span>
                                                    </p>
                                                    <p className="text-muted small mb-2">
                                                        {producto.categoria}
                                                    </p>
                                                    {producto.disponible ? (
                                                        <button className="btn btn-primary btn-sm w-100">
                                                            Agregar al Carrito
                                                        </button>
                                                    ) : (
                                                        <button className="btn btn-secondary btn-sm w-100" disabled>
                                                            No Disponible
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {}
            <footer className="bg-light border-top mt-4 p-3">
                <div className="container text-center text-muted">
                    <p className="mb-0">&copy; 2025 Papelería Lapizito. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
}

export default DashboardCliente;