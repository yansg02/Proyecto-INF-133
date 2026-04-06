import React from 'react';

const Contacto = () => {
    return (
        <div className="container py-5">
            <div className="text-center mb-5">
                <h1 className="fw-bold display-5 mb-3">Contáctanos</h1>
                <p className="lead text-muted">Contamos con todo tipo de material escolar</p>
            </div>
            
            <div className="row">
                <div className="col-lg-8 mb-5 mb-lg-0">
                    <div className="card shadow border-0">
                        <div className="card-body p-5">
                            <h3 className="card-title mb-4">Envíanos un mensaje</h3>
                            <form>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Nombre *</label>
                                        <input type="text" className="form-control" required />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Email *</label>
                                        <input type="email" className="form-control" required />
                                    </div>
                                </div>
                                
                                <div className="mb-3">
                                    <label className="form-label">Asunto *</label>
                                    <select className="form-select" required>
                                        <option value="">Seleccionar...</option>
                                        <option value="pedido">Compra online</option>
                                        <option value="queja">Queja o reclamo</option>
                                        <option value="sugerencia">Sugerencia</option>
                                        <option value="trabajo">Solicitud de empleo</option>
                                    </select>
                                </div>
                                
                                <div className="mb-3">
                                    <label className="form-label">Mensaje *</label>
                                    <textarea className="form-control" rows="5" required></textarea>
                                </div>
                                
                                <button type="submit" className="btn btn-primary btn-lg">
                                    Enviar Mensaje
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                
                <div className="col-lg-4">
                    <div className="card mb-4 border-0 shadow-sm">
                        <div className="card-body p-4">
                            <h4 className="card-title mb-4">
                                <i className="bi bi-geo-alt text-primary me-2"></i>
                                Dirección
                            </h4>
                            <p className="card-text">
                                Calle Principal #123<br />
                                Z. Miraflores<br />
                                Ciudad, Bolivia
                            </p>
                        </div>
                    </div>
                    
                    <div className="card mb-4 border-0 shadow-sm">
                        <div className="card-body p-4">
                            <h4 className="card-title mb-4">
                                <i className="bi bi-telephone text-primary me-2"></i>
                                Teléfonos
                            </h4>
                            <ul className="list-unstyled">
                                <li>
                                    <strong>Administración:</strong> (591) 777-77779
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="card border-0 shadow-sm">
                        <div className="card-body p-4">
                            <h4 className="card-title mb-4">
                                <i className="bi bi-clock text-primary me-2"></i>
                                Horarios
                            </h4>
                            <ul className="list-unstyled">
                                <li className="mb-2">
                                    <strong>Lunes a Viernes:</strong><br />
                                    9:00 - 21:00
                                </li>
                                <li className="mb-2">
                                    <strong>Sábados:</strong><br />
                                    10:00 - 20:00
                                </li>
                                <li>
                                    <strong>Domingos:</strong><br />
                                    Cerrado
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contacto;