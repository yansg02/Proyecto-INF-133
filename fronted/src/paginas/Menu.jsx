import React from 'react';

const Menu = () => {
    const categorias = [
        {
            id: 1,
            nombre: "Bolígrafos",
            productos: [
                { nombre: "Bolígrafo Azul BIC", precio: "2 Bs.", descripcion: "Tinta azul, punta fina 1.0mm" },
                { nombre: "Bolígrafo Rojo Pilot", precio: "3 Bs.", descripcion: "Tinta roja, escritura suave" },
                { nombre: "Bolígrafo Negro Premium", precio: "4 Bs.", descripcion: "Tinta negra de larga duración" }
            ]
        },
        {
            id: 2,
            nombre: "Cuadernos y Libretas",
            productos: [
                { nombre: "Cuaderno 100 hojas", precio: "12 Bs.", descripcion: "Rayado, tapa dura" },
                { nombre: "Cuaderno de Dibujo A4", precio: "18 Bs.", descripcion: "100 hojas blancas, gramaje 120g" },
                { nombre: "Libreta de Notas", precio: "8 Bs.", descripcion: "Tamaño bolsillo, 80 hojas" }
            ]
        },
        {
            id: 3,
            nombre: "Útiles de Escritura",
            productos: [
                { nombre: "Lápiz Grafito HB", precio: "1 Bs.", descripcion: "Docena de lápices" },
                { nombre: "Marcadores de Colores", precio: "15 Bs.", descripcion: "Set de 12 colores" },
                { nombre: "Highlighters Fluorescentes", precio: "10 Bs.", descripcion: "Pack de 4 colores" }
            ]
        },
        {
            id: 4,
            nombre: "Otros Materiales",
            productos: [
                { nombre: "Borrador de Caucho", precio: "2 Bs.", descripcion: "Borrador clásico" },
                { nombre: "Regla de 30cm", precio: "5 Bs.", descripcion: "De plástico transparente" },
                { nombre: "Pegamento en Barra", precio: "3 Bs.", descripcion: "40g, secado rápido" }
            ]
        }
    ];

    return (
        <div className="container py-5">
            <div className="text-center mb-5  bg-white rounded-4 shadow-sm p-4">
                <h1 className="fw-bold display-5 mb-3">Materiales Escolares y Librería</h1>
                <p className="lead text-muted">Encuentra todos los útiles que necesitas para estudiar</p>
            </div>
            
            {categorias.map((categoria) => (
                <div key={categoria.id} className="mb-5">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="h3 fw-bold">{categoria.nombre}</h2>
                        <span className="badge bg-primary rounded-pill">{categoria.productos.length} productos</span>
                    </div>
                    
                    <div className="row g-4">
                        {categoria.productos.map((producto, index) => (
                            <div key={index} className="col-md-6 col-lg-4">
                                <div className="card h-100 border-0 shadow-sm">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <h5 className="card-title mb-0">{producto.nombre}</h5>
                                            <span className="badge bg-success fs-6">{producto.precio}</span>
                                        </div>
                                        <p className="card-text text-muted mb-4">{producto.descripcion}</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <button className="btn btn-sm btn-outline-primary">
                                                <i className="bi bi-cart-plus"></i> Agregar
                                            </button>
                                            <button className="btn btn-sm btn-outline-secondary">
                                                <i className="bi bi-heart"></i> Favorito
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            
            <div className="card border-primary mt-5">
                <div className="card-body text-center py-4">
                    <h3 className="card-title mb-3">¿Necesitas algo específico?</h3>
                    <p className="card-text mb-4">Tenemos una amplia variedad de materiales. Contacta con nosotros para consultas sobre productos especiales.</p>
                    <a href="/contacto" className="btn btn-primary btn-lg">
                        Contactar Ahora
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Menu;