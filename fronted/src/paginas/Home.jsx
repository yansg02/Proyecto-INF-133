import React from 'react';
import HeroSection from '../componentes/comunes/HeroSection.jsx';
import MenuCards from '../componentes/comunes/MenuCards.jsx';
import Testimonios from '../componentes/comunes/Testimonios.jsx';

const Home = () => {
    return (
        <>
            <HeroSection />
            <div className="container py-5">
                <MenuCards />
                <Testimonios />
            </div>
        </>
    );
};

export default Home;