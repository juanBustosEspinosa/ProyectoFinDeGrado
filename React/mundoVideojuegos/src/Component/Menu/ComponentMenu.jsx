import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";  
import "./ComponentMenu.css";
import foto from "../../Fotos/foto.webp"

function ComponentMenu() {
    const navigate = useNavigate();
    const { usuario, logout } = useContext(AuthContext);

    // Estado para abrir/cerrar menú hamburguesa
    const [menuAbierto, setMenuAbierto] = useState(false);

    const cerrarSesion = () => {
        logout();
        navigate("/login");
    }
    const irAlPerfil = () => {
        navigate('/Perfil', { state: { usuario } });
    };

    // Toggle menú hamburguesa
    const toggleMenu = () => {
        setMenuAbierto(!menuAbierto);
    }

    return (
    <nav className="navbar">
        <div className="navbar-left">
            <div className="logo">MundoVideoJuegos</div>
        </div>
        
        <button className="hamburger" onClick={toggleMenu}>  Menu      </button>

        {/* AÑADIR la clase 'show' si menuAbierto es true */}
        <ul className={`nav-links ${menuAbierto ? 'show' : ''}`}>
            <li><Link to="/" onClick={() => setMenuAbierto(false)}>Inicio</Link></li>

            <li className="submenu">
                <a href="#" onClick={e => e.preventDefault()}>Tendencias ▾</a>
                <ul className="dropdown">
                    <li><NavLink to="/juegosMes" onClick={() => setMenuAbierto(false)}>Juegos Del Mes</NavLink></li>
                    <li><NavLink to="/MensajeMes" onClick={() => setMenuAbierto(false)}>Mas Hablado</NavLink></li>
                    <li><NavLink to="/UsuarioMes" onClick={() => setMenuAbierto(false)}>Nuevos Usuario del Mes</NavLink></li>
                </ul>
            </li>

            <li><NavLink to="/juegos" onClick={() => setMenuAbierto(false)}>Juegos</NavLink></li>
            <li><a href="#" onClick={e => e.preventDefault()}>Contacto</a></li>
        </ul>

        <div className="navbar-right">
            {usuario ? (
                <div className="usuario">                    
                    <button onClick={() => {cerrarSesion(); setMenuAbierto(false)}} className="cerrar_sesion">Cerrar sesión</button>
                    <span><NavLink to="/Perfil" state={{ usuario }} onClick={() => setMenuAbierto(false)}>{usuario.nickname}</NavLink></span>
                    <img src={usuario.imagen ? `data:image/jpeg;base64,${usuario.imagen}` : foto} alt="perfil" className="perfil-img" />
                </div>
            ) : (
                <button className="InicioSesion2" onClick={() => {navigate("/formulario"); setMenuAbierto(false)}}>Iniciar Sesión</button>
            )}
        </div>
    </nav>
    );
}

export default ComponentMenu;
