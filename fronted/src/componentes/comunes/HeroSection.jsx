import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <div className="hero-section position-relative overflow-hidden">
            <div className="container py-5">
                <div className="row align-items-center py-5">
                    <div className="col-lg-6 bg-white p-3 rounded-4 shadow-sm">
                        <h1 className="display-4 fw-bold mb-4">
                            Los mejores productos<br />
                            <span className="text-primary">para tu creatividad</span>
                        </h1>
                        <p className="lead mb-4">
                            Desde 2010 ofreciendo calidad y variedad. Libros, cuadernos, 
                            útiles escolares y material de papelería, seleccionados con cuidado.
                        </p>
                        <div className="d-flex gap-3">
                            <Link to="/menu" className="btn btn-primary btn-lg">
                                Ver Catálogo
                            </Link>
                            <Link to="/contacto" className="btn btn-outline-primary btn-lg">
                                Realizar Pedido
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner rounded-3">
                                <div className="carousel-item active">
                                    <img 
                                        src="https://www.hiperoffice.es/wp-content/uploads/foto-6.jpg" 
                                        className="d-block w-100" 
                                        alt="Libros"
                                    />
                                </div>
                                <div className="carousel-item">
                                    <img 
                                        src="https://images.unsplash.com/photo-1557672172-298e090d0f80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                                        className="d-block w-100" 
                                        alt="Útiles escolares"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;