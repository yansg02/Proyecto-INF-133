import { useState, useEffect } from 'react';
import { 
    obtenerIngredientes, 
    crearIngrediente, 
    actualizarIngrediente, 
    eliminarIngrediente 
} from '../../../servicios/ingredienteService';

function GestionIngredientes() {
    const [ingredientes, setIngredientes] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [mostrarForm, setMostrarForm] = useState(false);
    const [editandoId, setEditandoId] = useState(null);
    const [formData, setFormData] = useState({
        nombreI: '',
        stock: 0,
        unidadMedida: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        cargarIngredientes();
    }, []);

    const cargarIngredientes = async () => {
        try {
            const data = await obtenerIngredientes();
            setIngredientes(data);
        } catch (error) {
            console.error('Error:', error);
            setError('Error al cargar ingredientes');
        } finally {
            setCargando(false);
        }
    };

    const handleEliminar = async (id) => {
        if (window.confirm('¿Seguro que quieres eliminar este ingrediente?')) {
            try {
                await eliminarIngrediente(id);
                cargarIngredientes();
                alert('Ingrediente eliminado');
            } catch (error) {
                console.error('Error:', error);
                alert('Error al eliminar');
            }
        }
    };

    const handleNuevo = () => {
        setEditandoId(null);
        setFormData({
            nombreI: '',
            stock: 0,
            unidadMedida: ''
        });
        setMostrarForm(true);
        setError('');
    };

    const handleEditar = (ingrediente) => {
        setEditandoId(ingrediente.idIngrediente);
        setFormData({
            nombreI: ingrediente.nombreI,
            stock: ingrediente.stock,
            unidadMedida: ingrediente.unidadMedida || ''
        });
        setMostrarForm(true);
        setError('');
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'stock' ? parseInt(value) || 0 : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.nombreI.trim()) {
            setError('El nombre es obligatorio');
            return;
        }

        try {
            if (editandoId) {
                await actualizarIngrediente(editandoId, formData);
                alert('Ingrediente actualizado');
            } else {
                await crearIngrediente(formData);
                alert('Ingrediente creado');
            }
            setMostrarForm(false);
            cargarIngredientes();
            setError('');
        } catch (error) {
            console.error('Error:', error);
            setError('Error al guardar ingrediente');
        }
    };

    const getStockColor = (stock) => {
        if (stock === 0) return 'danger';
        if (stock < 10) return 'warning';
        return 'success';
    };

    const getStockText = (stock) => {
        if (stock === 0) return 'Agotado';
        if (stock < 5) return 'Bajo';
        if (stock < 10) return 'Medio';
        return 'Alto';
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
                <h2>Gestión de Ingredientes</h2>
                <button className="btn btn-primary" onClick={handleNuevo}>+ Nuevo Ingrediente</button>
            </div>

            {mostrarForm && (
                <div className="card mb-4 shadow">
                    <div className="card-header bg-primary text-white">
                        <h5 className="mb-0">{editandoId ? 'Editar Ingrediente' : 'Nuevo Ingrediente'}</h5>
                    </div>
                    <div className="card-body">
                        {error && (<div className="alert alert-danger">{error}</div>)}
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Nombre *</label>
                                    <input type="text" className="form-control" name="nombreI" value={formData.nombreI} onChange={handleFormChange} placeholder="Ej: Tomate, Queso, Pan" required />
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label className="form-label">Stock</label>
                                    <input type="number" className="form-control" name="stock" value={formData.stock} onChange={handleFormChange} min="0" step="1" />
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label className="form-label">Unidad</label>
                                    <select className="form-select" name="unidadMedida" value={formData.unidadMedida} onChange={handleFormChange}>
                                        <option value="">Seleccionar</option>
                                        <option value="kg">Kilogramos (kg)</option>
                                        <option value="g">Gramos (g)</option>
                                        <option value="L">Litros (L)</option>
                                        <option value="ml">Mililitros (ml)</option>
                                        <option value="unidad">Unidades</option>
                                        <option value="paquete">Paquete</option>
                                    </select>
                                </div>
                            </div>
                            <div className="d-flex gap-2">
                                <button type="submit" className="btn btn-success">{editandoId ? 'Actualizar' : 'Guardar'}</button>
                                <button type="button" className="btn btn-secondary" onClick={() => setMostrarForm(false)}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="card shadow">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead className="table-light">
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Stock</th>
                                    <th>Estado</th>
                                    <th>Unidad</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ingredientes.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center text-muted py-4">No hay ingredientes registrados</td>
                                    </tr>
                                ) : (
                                    ingredientes.map(ing => (
                                        <tr key={ing.idIngrediente}>
                                            <td><strong>#{ing.idIngrediente}</strong></td>
                                            <td><strong>{ing.nombreI}</strong></td>
                                            <td><span className="fw-bold">{ing.stock}</span></td>
                                            <td><span className={`badge bg-${getStockColor(ing.stock)}`}>{getStockText(ing.stock)}</span></td>
                                            <td>{ing.unidadMedida || '-'}</td>
                                            <td>
                                                <div className="btn-group btn-group-sm">
                                                    <button className="btn btn-outline-warning" onClick={() => handleEditar(ing)} title="Editar">Editar</button>
                                                    <button className="btn btn-outline-danger" onClick={() => handleEliminar(ing.idIngrediente)} title="Eliminar">Eliminar</button>
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

            <div className="row mt-4">
                <div className="col-md-4">
                    <div className="card text-white bg-info">
                        <div className="card-body">
                            <h5 className="card-title">Total</h5>
                            <h2>{ingredientes.length}</h2>
                            <p className="card-text">ingredientes</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-white bg-warning">
                        <div className="card-body">
                            <h5 className="card-title">Bajo Stock</h5>
                            <h2>{ingredientes.filter(i => i.stock < 5).length}</h2>
                            <p className="card-text">ingredientes</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-white bg-danger">
                        <div className="card-body">
                            <h5 className="card-title">Agotados</h5>
                            <h2>{ingredientes.filter(i => i.stock === 0).length}</h2>
                            <p className="card-text">ingredientes</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GestionIngredientes;
