import React from 'react';

const Biblioteca = () => {
    const equipo = [
        { nombre: "Anahi", puesto: "", imagen: "https://randomuser.me/api/portraits/women/65.jpg" },
        { nombre: "Charli", puesto: "", imagen: "https://randomuser.me/api/portraits/men/32.jpg" },
        { nombre: "Johan", puesto: "", imagen: "https://randomuser.me/api/portraits/men/5.jpg" }
    ];

    return (
        <div className="container py-5">
            <div className="text-center mb-5">
                <h1 className="fw-bold display-5 mb-3">Nuestra Libreria</h1>
                <p className="lead text-muted">Descubre un mundo de conocimiento y cultura</p>
            </div>
            
            <div className="row align-items-center mb-5">
                <div className="col-lg-6 mb-4 mb-lg-0">
                    <img 
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrbKd4_17qhNvGggqdwBYkUL4lpyoanwOP0g&s'
                        alt="Nuestra biblioteca" 
                        className="img-fluid rounded shadow"
                    />
                </div>
                <div className="col-lg-6">
                    <h2 className="fw-bold mb-4">Nuestra Historia</h2>
                    <p className="mb-4">
                        Nuestra libreria fue fundada en 2005 con el objetivo de traer productos a zonas alejadas de Bolivia. 
                        Desde entonces, hemos crecido y nos hemos convertido en un espacio esencial para la comunidad.
                    </p>
                    <p className="mb-4">
                        Creemos en el poder de los libros para transformar vidas y ofrecemos un ambiente acogedor 
                        para todos los amantes de la lectura.
                    </p>
                    <div className="d-flex align-items-center">
                        <div className="me-4">
                            <h3 className="display-6 fw-bold text-primary mb-0">15+</h3>
                            <p className="text-muted mb-0">Años de servicio</p>
                        </div>
                        <div className="me-4">
                            <h3 className="display-6 fw-bold text-primary mb-0">20K+</h3>
                            <p className="text-muted mb-0">Libros disponibles</p>
                        </div>
                        <div>
                            <h3 className="display-6 fw-bold text-primary mb-0">6/7</h3>
                            <p className="text-muted mb-0">Abierto todos los días</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="row mb-5">
                <div className="col-12">
                    <div className="card border-primary">
                        <div className="card-body p-4">
                            <div className="row align-items-center">
                                <div className="col-md-3 text-center mb-3 mb-md-0">
                                    <i className="bi bi-book display-4 text-primary"></i>
                                </div>
                                <div className="col-md-9">
                                    <h3 className="card-title">Nuestra Misión</h3>
                                    <p className="card-text mb-0">
                                        Proporcionar acceso a la información y promover la lectura como una herramienta 
                                        para el desarrollo personal y comunitario.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="text-center mb-5">
                <h2 className="fw-bold mb-4">Nuestro Equipo</h2>
                <p className="lead text-muted mb-5">Conoce a las personas que hacen posible nuestra biblioteca</p>
            </div>
            
            <div className="row g-4">
                {equipo.map((persona, index) => (
                    <div key={index} className="col-md-6 col-lg-3">
                        <div className="card text-center border-0 shadow-sm h-100">
                            <div className="card-body p-4">
                                <img 
                                    src={persona.imagen} 
                                    alt={persona.nombre}
                                    className="rounded-circle mb-3"
                                    style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                                />
                                <h5 className="card-title mb-2">{persona.nombre}</h5>
                                <p className="card-text text-muted mb-3">{persona.puesto}</p>
                                <div className="social-links">
                                    <a href="#" className="text-primary me-2">
                                        <i className="bi bi-facebook"></i>
                                    </a>
                                    <a href="#" className="text-primary me-2">
                                        <i className="bi bi-instagram"></i>
                                    </a>
                                    <a href="#" className="text-primary">
                                        <i className="bi bi-linkedin"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="card bg-light border-0 mt-5">
                <div className="card-body text-center py-5">
                    <h2 className="card-title mb-4">¿Quieres ser parte de nuestro equipo?</h2>
                    <p className="card-text mb-4">Siempre estamos buscando personas apasionadas por la literatura.</p>
                    <a href="/contacto" className="btn btn-primary btn-lg">
                        Enviar CV
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Biblioteca;
