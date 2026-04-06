import React from 'react';

const Testimonios = () => {
    const testimonios = [
        {
            id: 1,
            nombre: "Ana Torres",
            comentario: "La mejor papelería de la ciudad. Tienen todo lo que necesito para mis proyectos.",
            rating: 5,
            fecha: "Hace 2 semanas"
        },
        {
            id: 2,
            nombre: "Luis Martínez",
            comentario: "Excelente atención al cliente y una gran variedad de libros. 100% recomendado.",
            rating: 5,
            fecha: "Hace 1 mes"
        },
        {
            id: 3,
            nombre: "Sofía López",
            comentario: "Siempre encuentro lo que busco y los precios son muy justos.",
            rating: 4,
            fecha: "Hace 3 días"
        }
    ];

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <i 
                key={i} 
                className={`bi ${i < rating ? 'bi-star-fill text-warning' : 'bi-star'}`}
            ></i>
        ));
    };

    return (
        <section className="py-5 bg-light rounded-3">
            <div className="container">
                <h2 className="text-center mb-5">Lo que dicen nuestros clientes</h2>
                <div className="row g-4">
                    {testimonios.map((testimonio) => (
                        <div key={testimonio.id} className="col-md-4">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                        <div>
                                            <h5 className="card-title mb-1">{testimonio.nombre}</h5>
                                            <div className="text-warning">
                                                {renderStars(testimonio.rating)}
                                            </div>
                                        </div>
                                        <small className="text-muted">{testimonio.fecha}</small>
                                    </div>
                                    <p className="card-text">"{testimonio.comentario}"</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonios;