import { useState } from 'react';
import { registrarUsuario, verificarUsuario } from '../servicios/usuarioService';
import '../styles/registro.css';

function Registro() {
    const [form, setForm] = useState({
        ci: '',
        nombre: '',
        apPaterno: '',
        apMaterno: '',
        telefono: '',
        email: '',
        sexo: '',
        fechaNac: '',
        direccion: '',
        nombUsuario: '',
        contrasenia: '',
        rol: 'CLIENTE' 
    });

    const [mensaje, setMensaje] = useState('');
    const [cargando, setCargando] = useState(false);
    const [confirmarContrasenia, setConfirmarContrasenia] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje('');
        
        if (form.contrasenia !== confirmarContrasenia) {
            setMensaje('Las contraseñas no coinciden');
            return;
        }
        
        if (form.ci.length < 5) {
            setMensaje('El CI debe tener al menos 5 caracteres');
            return;
        }
        
        if (form.nombUsuario.length < 3) {
            setMensaje('El nombre de usuario debe tener al menos 3 caracteres');
            return;
        }
        
        if (form.contrasenia.length < 6) {
            setMensaje('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        setCargando(true);
        
        try {
            const existe = await verificarUsuario(form.nombUsuario);
            if (existe) {
                setMensaje('El nombre de usuario ya existe');
                setCargando(false);
                return;
            }
            
            await registrarUsuario(form);
            setMensaje('✅ Usuario registrado exitosamente');
            
            setForm({
                ci: '', nombre: '', apPaterno: '', apMaterno: '',
                telefono: '', email: '', sexo: '', fechaNac: '',
                direccion: '', nombUsuario: '', contrasenia: '', rol: 'CLIENTE'
            });
            setConfirmarContrasenia('');
            
        } catch (error) {
            console.error('Error en registro:', error);
            setMensaje('❌ Error al registrar usuario');
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="form-container">
            <h2>Registro de Usuario</h2>
            
            {mensaje && (
                <div className={`mensaje ${mensaje.includes('✅') ? 'exito' : 'error'}`}>
                    {mensaje}
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="form-registro">
                {}
                <div className="form-section">
                    <h3>Datos Personales</h3>
                    
                    <div className="form-group">
                        <label>Carnet de Identidad (CI): *</label>
                        <input 
                            type="text" 
                            name="ci" 
                            placeholder="Ej: 12345678" 
                            value={form.ci} 
                            onChange={handleChange} 
                            required 
                            minLength="5"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Nombre: *</label>
                        <input 
                            type="text" 
                            name="nombre" 
                            placeholder="Nombre" 
                            value={form.nombre} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group">
                            <label>Apellido Paterno: *</label>
                            <input 
                                type="text" 
                                name="apPaterno" 
                                placeholder="Apellido Paterno" 
                                value={form.apPaterno} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        
                        <div className="form-group">
                            <label>Apellido Materno:</label>
                            <input 
                                type="text" 
                                name="apMaterno" 
                                placeholder="Apellido Materno" 
                                value={form.apMaterno} 
                                onChange={handleChange} 
                            />
                        </div>
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group">
                            <label>Teléfono:</label>
                            <input 
                                type="tel" 
                                name="telefono" 
                                placeholder="Ej: 77712345" 
                                value={form.telefono} 
                                onChange={handleChange} 
                            />
                        </div>
                        
                        <div className="form-group">
                            <label>Email:</label>
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="ejemplo@email.com" 
                                value={form.email} 
                                onChange={handleChange} 
                            />
                        </div>
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group">
                            <label>Sexo:</label>
                            <select name="sexo" value={form.sexo} onChange={handleChange}>
                                <option value="">Seleccionar</option>
                                <option value="M">Masculino</option>
                                <option value="F">Femenino</option>
                            </select>
                        </div>
                        
                        <div className="form-group">
                            <label>Fecha de Nacimiento:</label>
                            <input 
                                type="date" 
                                name="fechaNac" 
                                value={form.fechaNac} 
                                onChange={handleChange} 
                            />
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label>Dirección:</label>
                        <textarea 
                            name="direccion" 
                            placeholder="Dirección completa" 
                            value={form.direccion} 
                            onChange={handleChange} 
                            rows="3"
                        />
                    </div>
                </div>
                
                {}
                <div className="form-section">
                    <h3>Datos de Acceso</h3>
                    
                    <div className="form-group">
                        <label>Nombre de Usuario: *</label>
                        <input 
                            type="text" 
                            name="nombUsuario" 
                            placeholder="Usuario para login" 
                            value={form.nombUsuario} 
                            onChange={handleChange} 
                            required 
                            minLength="3"
                        />
                        <small>Este será tu nombre para iniciar sesión</small>
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group">
                            <label>Contraseña: *</label>
                            <input 
                                type="password" 
                                name="contrasenia" 
                                placeholder="Mínimo 6 caracteres" 
                                value={form.contrasenia} 
                                onChange={handleChange} 
                                required 
                                minLength="6"
                            />
                        </div>
                        
                        <div className="form-group">
                            <label>Confirmar Contraseña: *</label>
                            <input 
                                type="password" 
                                placeholder="Repite la contraseña" 
                                value={confirmarContrasenia} 
                                onChange={(e) => setConfirmarContrasenia(e.target.value)}
                                required 
                                minLength="6"
                            />
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label>Tipo de Usuario:</label>
                        <select name="rol" value={form.rol} onChange={handleChange}>
                            <option value="CLIENTE">Cliente</option>
                            <option value="ADMIN">Administrador</option>
                        </select>
                        <small>Por defecto es Cliente</small>
                    </div>
                </div>
                
                <div className="form-actions">
                    <button type="submit" disabled={cargando} className="btn-primary">
                        {cargando ? 'Registrando...' : 'Registrar Usuario'}
                    </button>
                    <button type="button" className="btn-secondary" onClick={() => {
                        setForm({
                            ci: '', nombre: '', apPaterno: '', apMaterno: '',
                            telefono: '', email: '', sexo: '', fechaNac: '',
                            direccion: '', nombUsuario: '', contrasenia: '', rol: 'CLIENTE'
                        });
                        setConfirmarContrasenia('');
                        setMensaje('');
                    }}>
                        Limpiar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Registro;