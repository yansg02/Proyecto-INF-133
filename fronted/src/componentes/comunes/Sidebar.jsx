import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ user }) => {
    return (
        <aside style={{
            width: '250px',
            background: '#2c3e50',
            color: 'white',
            padding: '1rem',
            minHeight: '100vh'
        }}>
            <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ margin: 0 }}>Papelería Lapizito</h3>
                <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem' }}>
                    Rol: {user?.rol || 'Usuario'}
                </p>
            </div>
            
            <nav>
                <NavLink 
                    to="/dashboard/admin" 
                    style={({ isActive }) => ({
                        display: 'flex',
                        alignItems: 'center',
                        padding: '10px',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '5px',
                        marginBottom: '5px',
                        background: isActive ? '#3498db' : 'transparent'
                    })}
                >
                    <span style={{ marginRight: '10px' }}>👑</span>
                    <span>Admin</span>
                </NavLink>
                
                <NavLink 
                    to="/dashboard/gerente"
                    style={({ isActive }) => ({
                        display: 'flex',
                        alignItems: 'center',
                        padding: '10px',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '5px',
                        marginBottom: '5px',
                        background: isActive ? '#3498db' : 'transparent'
                    })}
                >
                    <span style={{ marginRight: '10px' }}>📈</span>
                    <span>Gerente</span>
                </NavLink>
                
                <NavLink 
                    to="/dashboard/cajero"
                    style={({ isActive }) => ({
                        display: 'flex',
                        alignItems: 'center',
                        padding: '10px',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '5px',
                        marginBottom: '5px',
                        background: isActive ? '#3498db' : 'transparent'
                    })}
                >
                    <span style={{ marginRight: '10px' }}>💰</span>
                    <span>Cajero</span>
                </NavLink>
                
            </nav>
        </aside>
    );
};

export default Sidebar;