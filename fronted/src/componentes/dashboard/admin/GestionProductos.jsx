import { useState, useEffect } from 'react';
import { 
    obtenerProductos, 
    crearProducto, 
    actualizarProducto, 
    eliminarProducto 
} from '../../../servicios/productoService';

function GestionProductos() {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [productoEditando, setProductoEditando] = useState(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [formulario, setFormulario] = useState({
        nombreP: '',
        descripcion: '',
        precio: '',
        categoria: '',
        disponible: true
    });

    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        try {
            const data = await obtenerProductos();
            setProductos(data);
        } catch (error) {
            console.error('Error:', error);
            alert('Error al cargar productos');
        } finally {
            setCargando(false);
        }
    };

    const handleEliminar = async (id) => {
        if (window.confirm('¿Seguro que quieres eliminar este producto?')) {
            try {
                await eliminarProducto(id);
                cargarProductos();
                alert('Producto eliminado correctamente');
            } catch (error) {
                console.error('Error:', error);
                alert('Error al eliminar producto');
            }
        }
    };

    const handleEditar = (producto) => {
        setProductoEditando(producto.idProducto);
        setFormulario({
            nombreP: producto.nombreP,
            descripcion: producto.descripcion || '',
            precio: producto.precio.toString(),
            categoria: producto.categoria || '',
            disponible: producto.disponible
        });
        setMostrarFormulario(true);
    };

    const handleNuevo = () => {
        setProductoEditando(null);
        setFormulario({
            nombreP: '',
            descripcion: '',
            precio: '',
            categoria: '',
            disponible: true
        });
        setMostrarFormulario(true);
    };

    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormulario({
            ...formulario,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleGuardar = async (e) => {
        e.preventDefault();
        
        const datos = {
            ...formulario,
            precio: parseFloat(formulario.precio)
        };
        
        try {
            if (productoEditando) {
                await actualizarProducto(productoEditando, datos);
                alert('Producto actualizado correctamente');
            } else {
                await crearProducto(datos);
                alert('Producto creado correctamente');
            }
            
            setMostrarFormulario(false);
            cargarProductos();
        } catch (error) {
            console.error('Error:', error);
            alert('Error al guardar producto');
        }
    };

    const toggleDisponible = async (id, disponible) => {
        try {
            await actualizarProducto(id, { disponible: !disponible });
            cargarProductos();
            alert(`Producto ${!disponible ? 'activado' : 'desactivado'}`);
        } catch (error) {
            console.error('Error:', error);
            alert('Error al cambiar estado');
        }
    };

    if (cargando) return <div className="text-center p-5">Cargando productos...</div>;

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Gestión de Productos</h2>
                <button className="btn btn-primary" onClick={handleNuevo}>
                    + Nuevo Producto
                </button>
            </div>

            {}
            {mostrarFormulario && (
                <div className="card mb-4">
                    <div className="card-header">
                        <h5>{productoEditando ? 'Editar Producto' : 'Nuevo Producto'}</h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleGuardar}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Nombre del Producto *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="nombreP"
                                        value={formulario.nombreP}
                                        onChange={handleFormChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Categoría</label>
                                    <select
                                        className="form-select"
                                        name="categoria"
                                        value={formulario.categoria}
                                        onChange={handleFormChange}
                                    >
                                        <option value="">Seleccionar categoría</option>
                                        <option value="Cuadernos">Cuadernos</option>
                                        <option value="Lápices y Bolígrafos">Lápices y Bolígrafos</option>
                                        <option value="Libros">Libros</option>
                                        <option value="Útiles Escolares">Útiles Escolares</option>
                                        <option value="Papelería General">Papelería General</option>
                                        <option value="Artículos de Arte">Artículos de Arte</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div className="mb-3">
                                <label className="form-label">Descripción</label>
                                <textarea
                                    className="form-control"
                                    name="descripcion"
                                    value={formulario.descripcion}
                                    onChange={handleFormChange}
                                    rows="3"
                                />
                            </div>
                            
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Precio (Bs.) *</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        className="form-control"
                                        name="precio"
                                        value={formulario.precio}
                                        onChange={handleFormChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mb-3 d-flex align-items-end">
                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            role="switch"
                                            id="disponible"
                                            name="disponible"
                                            checked={formulario.disponible}
                                            onChange={handleFormChange}
                                        />
                                        <label className="form-check-label" htmlFor="disponible">
                                            Disponible en el menú
                                        </label>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="d-flex gap-2">
                                <button type="submit" className="btn btn-success">
                                    {productoEditando ? 'Actualizar' : 'Crear'}
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
            <div className="row">
                {productos.map(producto => (
                    <div key={producto.idProducto} className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start mb-3">
                                    <h5 className="card-title mb-0">{producto.nombreP}</h5>
                                    <span className={`badge ${producto.disponible ? 'bg-success' : 'bg-danger'}`}>
                                        {producto.disponible ? 'Disponible' : 'No disponible'}
                                    </span>
                                </div>
                                
                                {producto.categoria && (
                                    <span className="badge bg-info mb-2">{producto.categoria}</span>
                                )}
                                
                                <p className="card-text text-muted small mb-3">
                                    {producto.descripcion || 'Sin descripción'}
                                </p>
                                
                                <div className="d-flex justify-content-between align-items-center">
                                    <h4 className="text-primary mb-0">
                                        Bs. {parseFloat(producto.precio).toFixed(2)}
                                    </h4>
                                    
                                    <div className="btn-group btn-group-sm">
                                        <button 
                                            className="btn btn-warning"
                                            onClick={() => handleEditar(producto)}
                                            title="Editar"
                                        >
                                            Editar
                                        </button>
                                        <button 
                                            className={`btn ${producto.disponible ? 'btn-secondary' : 'btn-success'}`}
                                            onClick={() => toggleDisponible(producto.idProducto, producto.disponible)}
                                            title={producto.disponible ? 'Desactivar' : 'Activar'}
                                        >
                                            {producto.disponible ? 'Desactivar' : 'Activar'}
                                        </button>
                                        <button 
                                            className="btn btn-danger"
                                            onClick={() => handleEliminar(producto.idProducto)}
                                            title="Eliminar"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GestionProductos;