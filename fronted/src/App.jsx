import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import Navbar from './componentes/comunes/Navbar';
import Footer from './componentes/comunes/Footer';

import Login from './paginas/Login';
import Registro from './paginas/Registro';
import Menu from './paginas/Menu';
import Contacto from './paginas/Contacto';
import Nosotros from './paginas/Nosotros';

import DashboardAdmin from './componentes/dashboard/admin/DashboardAdmin.jsx';
import DashboardCliente from './componentes/dashboard/cliente/DashboardCliente.jsx';

import './App.css';

function App() {
    return (
        <Router>
            <div className="app d-flex flex-column min-vh-100">
                <Navbar />
                <main className="flex-grow-1">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/registro" element={<Registro />} />
                        <Route path="/menu" element={<Menu />} />
                        <Route path="/contacto" element={<Contacto />} />
                        <Route path="/nosotros" element={<Nosotros />} />
                        
                        <Route path="/admin/*" element={<DashboardAdmin />} />
                        <Route path="/cliente/*" element={<DashboardCliente />} />
                        
                        <Route path="*" element={<Home />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;