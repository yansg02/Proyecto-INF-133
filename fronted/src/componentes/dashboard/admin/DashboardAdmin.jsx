import { useState, useEffect } from 'react';
import { useNavigate, Routes, Route, Link } from 'react-router-dom';
import GestionUsuarios from './GestionUsuarios.jsx';
import GestionProductos from './GestionProductos.jsx';
import GestionTiposProducto from './GestionTiposProducto.jsx';
import GestionPedidos from './GestionPedidos.jsx';
import GestionFacturas from './GestionFacturas.jsx';
import GestionImpresiones from './GestionImpresiones.jsx';

function DashboardAdmin() {
    const [usuario, setUsuario] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const usuarioData = JSON.parse(localStorage.getItem('usuario'));
        
        if (!usuarioData || usuarioData.rol !== 'ADMIN') {
            navigate('/login');
            return;
        }
        
        setUsuario(usuarioData);
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('usuario');
        navigate('/');
    };

    if (!usuario) return <div className="text-center p-5">Cargando...</div>;

    return (
        <div className="dashboard-admin d-flex">
            {}
            <div className="sidebar bg-dark text-white p-3" style={{width: '250px', minHeight: '100vh'}}>
                <h4 className="text-center mb-4">Papelería Lapizito</h4>
                <hr className="bg-light" />
                
                <div className="user-info text-center mb-4">
                    <p className="mb-1">👤 {usuario.nombre} {usuario.apPaterno}</p>
                    <span className="badge bg-danger">ADMIN</span>
                </div>
                
                <nav className="nav flex-column">
                    <Link to="/admin" className="nav-link text-white mb-2">Dashboard</Link>
                    <Link to="/admin/usuarios" className="nav-link text-white mb-2">Usuarios</Link>
                    <Link to="/admin/productos" className="nav-link text-white mb-2">Productos</Link>
                    <Link to="/admin/tipos-producto" className="nav-link text-white mb-2">Tipos de Producto</Link>
                    <Link to="/admin/pedidos" className="nav-link text-white mb-2">Ventas</Link>
                    <Link to="/admin/facturas" className="nav-link text-white mb-2">Facturas</Link>
                    <Link to="/admin/impresiones" className="nav-link text-white mb-2">Reportes</Link>
                    <hr className="bg-light" />
                    <button onClick={handleLogout} className="btn btn-outline-light mt-3 w-100">
                        Cerrar Sesión
                    </button>
                </nav>
            </div>

            {}
            <div className="content flex-grow-1 p-4">
                <Routes>
                    <Route path="/" element={
                        <div>
                            <h1>Panel de Administración</h1>
                            <p>Bienvenido, {usuario.nombre}</p>
                            <div className="row mt-4">
                                <div className="col-md-3 mb-3">
                                    <div className="card text-white bg-primary">
                                        <div className="card-body">
                                            <h5 className="card-title">Usuarios</h5>
                                            <p className="card-text">Gestiona todos los usuarios</p>
                                            <Link to="/admin/usuarios" className="btn btn-light">Ver</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <div className="card text-white bg-success">
                                        <div className="card-body">
                                            <h5 className="card-title">Productos</h5>
                                            <p className="card-text">Gestiona el menú</p>
                                            <Link to="/admin/productos" className="btn btn-light">Ver</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <div className="card text-white bg-warning">
                                        <div className="card-body">
                                            <h5 className="card-title">Tipos de Producto</h5>
                                            <p className="card-text">Control de categorías</p>
                                            <Link to="/admin/tipos-producto" className="btn btn-light">Ver</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <div className="card text-white bg-info">
                                        <div className="card-body">
                                            <h5 className="card-title">Ventas</h5>
                                            <p className="card-text">Ver todas las ventas</p>
                                            <Link to="/admin/pedidos" className="btn btn-light">Ver</Link>
                                        </div>
                                    </div>
                                </div>
                                {}
                                <div className="col-md-3 mb-3">
                                    <div className="card text-white bg-secondary">
                                        <div className="card-body">
                                            <h5 className="card-title">Impresiones</h5>
                                            <p className="card-text">Generar facturas PDF</p>
                                            <Link to="/admin/impresiones" className="btn btn-light">Ver</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    } />
                    <Route path="/usuarios" element={<GestionUsuarios />} />
                    <Route path="/productos" element={<GestionProductos />} />
                    <Route path="/tipos-producto" element={<GestionTiposProducto />} />
                    <Route path="/pedidos" element={<GestionPedidos />} />
                    <Route path="/facturas" element={<GestionFacturas />} />
                    <Route path="/impresiones" element={<GestionImpresiones />} /> {}
                    
                    {}
                    <Route path="/productos/nuevo" element={
                        <div>
                            <h2>Nuevo Producto</h2>
                            {}
                        </div>
                    } />
                    
                    <Route path="/productos/editar/:id" element={
                        <div>
                            <h2>Editar Producto</h2>
                            {}
                        </div>
                    } />
                </Routes>
            </div>
        </div>
    );
}

export default DashboardAdmin;