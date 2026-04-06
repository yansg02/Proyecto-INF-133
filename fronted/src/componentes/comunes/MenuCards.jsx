import React from 'react';

const MenuCards = () => {
    const productos = [
        {
            id: 1,
            nombre: "Cuaderno A4 100 hojas",
            descripcion: "Cuaderno de excelente calidad con papel grueso, ideal para apuntes y estudios",
            precio: "25 Bs.",
            categoria: "Cuadernos"
        },
        {
            id: 2,
            nombre: "Bolígrafos Gel Pack 12",
            descripcion: "Set de 12 bolígrafos gel de colores variados, tinta suave y de larga duración",
            precio: "15 Bs.",
            categoria: "Bolígrafos"
        },
        {
            id: 3,
            nombre: "Marcadores Permanentes",
            descripcion: "Marcadores de punta fina, resistentes al agua, ideales para trabajos creativos",
            precio: "18 Bs.",
            categoria: "Marcadores"
        },
        {
            id: 4,
            nombre: "Resmas de Papel Blanco",
            descripcion: "Papel bond 80g, paquete de 500 hojas, perfecto para impresión y fotocopias",
            precio: "10 Bs.",
            categoria: "Papel"
        }
    ];

    return (
        <section className="py-5">
            <h2 className="text-center mb-5">Nuestros Productos</h2>
            <div className="row g-4">
                {productos.map((producto) => (
                    <div key={producto.id} className="col-md-6 col-lg-3">
                        <div className="card h-100 shadow-sm border-0">
                            <div className="card-body d-flex flex-column">
                                <span className="badge bg-primary mb-2 align-self-start">
                                    {producto.categoria}
                                </span>
                                <h5 className="card-title">{producto.nombre}</h5>
                                <p className="card-text flex-grow-1">{producto.descripcion}</p>
                                <div className="d-flex justify-content-between align-items-center mt-auto">
                                    <span className="h5 text-primary mb-0">{producto.precio}</span>
                                    <button className="btn btn-outline-primary">
                                        <i className="bi bi-cart-plus"></i> Comprar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MenuCards;