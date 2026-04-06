import { useState, useEffect } from 'react';
import { obtenerUsuarios, eliminarUsuario, actualizarUsuario } from '../../../servicios/usuarioService';

function GestionUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [usuarioEditando, setUsuarioEditando] = useState(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [formulario, setFormulario] = useState({
        nombre: '',
        apPaterno: '',
        apMaterno: '',
        telefono: '',
        email: '',
        rol: 'CLIENTE',
        estado: 'ACTIVO'
    });

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const cargarUsuarios = async () => {
        try {
            const data = await obtenerUsuarios();
            setUsuarios(data);
        } catch (error) {
            console.error('Error:', error);
            alert('Error al cargar usuarios');
        } finally {
            setCargando(false);
        }
    };

    const handleEliminar = async (ci) => {
        if (window.confirm('¿Seguro que quieres desactivar este usuario?')) {
            try {
                await eliminarUsuario(ci);
                cargarUsuarios();
                alert('Usuario desactivado correctamente');
            } catch (error) {
                console.error('Error:', error);
                alert('Error al desactivar usuario');
            }
        }
    };

    const handleActivar = async (ci) => {
        try {
            await actualizarUsuario(ci, { estado: 'ACTIVO' });
            cargarUsuarios();
            alert('Usuario activado correctamente');
        } catch (error) {
            console.error('Error:', error);
            alert('Error al activar usuario');
        }
    };

    const handleEditar = (usuario) => {
        setUsuarioEditando(usuario.ci);
        setFormulario({
            nombre: usuario.nombre,
            apPaterno: usuario.apPaterno,
            apMaterno: usuario.apMaterno || '',
            telefono: usuario.telefono || '',
            email: usuario.email || '',
            rol: usuario.rol,
            estado: usuario.estado
        });
        setMostrarFormulario(true);
    };

    const handleNuevo = () => {
        setUsuarioEditando(null);
        setFormulario({
            nombre: '',
            apPaterno: '',
            apMaterno: '',
            telefono: '',
            email: '',
            rol: 'CLIENTE',
            estado: 'ACTIVO'
        });
        setMostrarFormulario(true);
    };

    const handleFormChange = (e) => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        });
    };

    const handleGuardar = async (e) => {
        e.preventDefault();
        
        try {
            if (usuarioEditando) {
                
                await actualizarUsuario(usuarioEditando, formulario);
                alert('Usuario actualizado correctamente');
            } else {
                alert('Para crear nuevo usuario usa el formulario de registro');
            }
            
            setMostrarFormulario(false);
            cargarUsuarios();
        } catch (error) {
            console.error('Error:', error);
            alert('Error al guardar usuario');
        }
    };

    if (cargando) return <div className="text-center p-5">Cargando usuarios...</div>;

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>👥 Gestión de Usuarios</h2>
                <button className="btn btn-primary" onClick={handleNuevo}>
                    + Nuevo Usuario
                </button>
            </div>

            {}
            {mostrarFormulario && (
                <div className="card mb-4">
                    <div className="card-header">
                        <h5>{usuarioEditando ? 'Editar Usuario' : 'Nuevo Usuario'}</h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleGuardar}>
                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Nombre</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="nombre"
                                        value={formulario.nombre}
                                        onChange={handleFormChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Apellido Paterno</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="apPaterno"
                                        value={formulario.apPaterno}
                                        onChange={handleFormChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Apellido Materno</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="apMaterno"
                                        value={formulario.apMaterno}
                                        onChange={handleFormChange}
                                    />
                                </div>
                            </div>
                            
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Teléfono</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        name="telefono"
                                        value={formulario.telefono}
                                        onChange={handleFormChange}
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={formulario.email}
                                        onChange={handleFormChange}
                                    />
                                </div>
                            </div>
                            
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Rol</label>
                                    <select
                                        className="form-select"
                                        name="rol"
                                        value={formulario.rol}
                                        onChange={handleFormChange}
                                    >
                                        <option value="CLIENTE">Cliente</option>
                                        <option value="EMPLEADO">Empleado</option>
                                        <option value="CAJERO">Cajero</option>
                                        <option value="COCINA">Cocina</option>
                                        <option value="GERENTE">Gerente</option>
                                        <option value="ADMIN">Administrador</option>
                                    </select>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Estado</label>
                                    <select
                                        className="form-select"
                                        name="estado"
                                        value={formulario.estado}
                                        onChange={handleFormChange}
                                    >
                                        <option value="ACTIVO">Activo</option>
                                        <option value="INACTIVO">Inactivo</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div className="d-flex gap-2">
                                <button type="submit" className="btn btn-success">
                                    {usuarioEditando ? 'Actualizar' : 'Crear'}
                                </button>
                                <button 
                                    type="button" 
                                    className="btn btn-secondary"
                                    onClick={() => setMostrarFormulario(false)}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {}
            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>CI</th>
                            <th>Nombre Completo</th>
                            <th>Contacto</th>
                            <th>Rol</th>
                            <th>Estado</th>
                            <th>Fecha Registro</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map(usuario => (
                            <tr key={usuario.ci}>
                                <td><strong>{usuario.ci}</strong></td>
                                <td>
                                    {usuario.nombre} {usuario.apPaterno} {usuario.apMaterno}
                                </td>
                                <td>
                                    <div>{usuario.email || 'Sin email'}</div>
                                    <small>{usuario.telefono || 'Sin teléfono'}</small>
                                </td>
                                <td>
                                    <span className={`badge bg-${getRolColor(usuario.rol)}`}>
                                        {usuario.rol}
                                    </span>
                                </td>
                                <td>
                                    <span className={`badge bg-${usuario.estado === 'ACTIVO' ? 'success' : 'secondary'}`}>
                                        {usuario.estado}
                                    </span>
                                </td>
                                <td>
                                    {new Date(usuario.fechaRegistro).toLocaleDateString()}
                                </td>
                                <td>
                                    <div className="btn-group btn-group-sm">
                                        <button 
                                            className="btn btn-warning"
                                            onClick={() => handleEditar(usuario)}
                                            title="Editar"
                                        >
                                            Editar
                                        </button>
                                        
                                        {usuario.estado === 'ACTIVO' ? (
                                            <button 
                                                className="btn btn-danger"
                                                onClick={() => handleEliminar(usuario.ci)}
                                                title="Desactivar"
                                            >
                                                Desactivar
                                            </button>
                                        ) : (
                                            <button 
                                                className="btn btn-success"
                                                onClick={() => handleActivar(usuario.ci)}
                                                title="Activar"
                                            >
                                                Activar
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function getRolColor(rol) {
    switch(rol) {
        case 'ADMIN': return 'danger';
        case 'GERENTE': return 'warning';
        case 'CAJERO': return 'info';
        case 'COCINA': return 'secondary';
        case 'EMPLEADO': return 'primary';
        case 'CLIENTE': return 'success';
        default: return 'light';
    }
}

export default GestionUsuarios;