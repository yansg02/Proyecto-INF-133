import { useState, useEffect } from 'react';
import { 
    obtenerTiposProducto, 
    crearTipoProducto, 
    actualizarTipoProducto, 
    eliminarTipoProducto 
} from '../../../servicios/tipoProductoService';

function GestionTiposProducto() {
    const [tiposProducto, setTiposProducto] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [mostrarForm, setMostrarForm] = useState(false);
    const [editandoId, setEditandoId] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        cargarTiposProducto();
    }, []);

    const cargarTiposProducto = async () => {
        try {
            const data = await obtenerTiposProducto();
            setTiposProducto(data);
        } catch (error) {
            console.error('Error:', error);
            setError('Error al cargar tipos de producto');
        } finally {
            setCargando(false);
        }
    };

    const handleEliminar = async (id) => {
        if (window.confirm('¿Seguro que quieres eliminar este tipo de producto?')) {
            try {
                await eliminarTipoProducto(id);
                cargarTiposProducto();
                alert('Tipo de producto eliminado');
            } catch (error) {
                console.error('Error:', error);
                alert('Error al eliminar');
            }
        }
    };

    const handleNuevo = () => {
        setEditandoId(null);
        setFormData({
            nombre: '',
            descripcion: ''
        });
        setMostrarForm(true);
        setError('');
    };

    const handleEditar = (tipo) => {
        setEditandoId(tipo.idTipoProducto);
        setFormData({
            nombre: tipo.nombre,
            descripcion: tipo.descripcion || ''
        });
        setMostrarForm(true);
        setError('');
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.nombre.trim()) {
            setError('El nombre es obligatorio');
            return;
        }

        try {
            if (editandoId) {
                await actualizarTipoProducto(editandoId, formData);
                alert('Tipo de producto actualizado');
            } else {
                await crearTipoProducto(formData);
                alert('Tipo de producto creado');
            }

            setMostrarForm(false);
            cargarTiposProducto();
            setError('');
            
        } catch (error) {
            console.error('Error:', error);
            setError('Error al guardar tipo de producto');
        }
    };

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
                <h2>Gestión de Tipos de Producto</h2>
                <button 
                    className="btn btn-primary"
                    onClick={handleNuevo}
                >
                    + Nuevo Tipo
                </button>
            </div>

            {}
            {mostrarForm && (
                <div className="card mb-4 shadow">
                    <div className="card-header bg-primary text-white">
                        <h5 className="mb-0">
                            {editandoId ? 'Editar Tipo de Producto' : 'Nuevo Tipo de Producto'}
                        </h5>
                    </div>
                    <div className="card-body">
                        {error && (
                            <div className="alert alert-danger">{error}</div>
                        )}
                        
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Nombre *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleFormChange}
                                        placeholder="Ej: Cuadernos, Lápices, Libros"
                                        required
                                    />
                                </div>
                                
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Descripción</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="descripcion"
                                        value={formData.descripcion}
                                        onChange={handleFormChange}
                                        placeholder="Descripción del tipo"
                                    />
                                </div>
                            </div>
                            
                            <div className="d-flex gap-2">
                                <button type="submit" className="btn btn-success">
                                    {editandoId ? 'Actualizar' : 'Guardar'}
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
            <div className="card shadow">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead className="table-light">
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Descripción</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tiposProducto.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="text-center text-muted py-4">
                                            No hay tipos de producto registrados
                                        </td>
                                    </tr>
                                ) : (
                                    tiposProducto.map(tipo => (
                                        <tr key={tipo.idTipoProducto}>
                                            <td><strong>#{tipo.idTipoProducto}</strong></td>
                                            <td>
                                                <strong>{tipo.nombre}</strong>
                                            </td>
                                            <td>
                                                {tipo.descripcion || '-'}
                                            </td>
                                            <td>
                                                <div className="btn-group btn-group-sm">
                                                    <button 
                                                        className="btn btn-outline-warning"
                                                        onClick={() => handleEditar(tipo)}
                                                        title="Editar"
                                                    >
                                                        Editar
                                                    </button>
                                                    <button 
                                                        className="btn btn-outline-danger"
                                                        onClick={() => handleEliminar(tipo.idTipoProducto)}
                                                        title="Eliminar"
                                                    >
                                                        Eliminar
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {}
            <div className="row mt-4">
                <div className="col-md-4">
                    <div className="card text-white bg-info">
                        <div className="card-body">
                            <h5 className="card-title">Total</h5>
                            <h2>{tiposProducto.length}</h2>
                            <p className="card-text">tipos de producto</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GestionTiposProducto;
