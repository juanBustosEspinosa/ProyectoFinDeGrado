import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";  
import "./ComponentMenu.css";
import foto from "../../Fotos/foto.webp"

function ComponentMenu() {
    const navigate = useNavigate();
    const { usuario, logout } = useContext(AuthContext);

    const cerrarSesion = () => {
        logout();
        navigate("/login");
    }

    return (
    <nav className="navbar">
        <div className="navbar-left">
            <div className="logo">MundoVideoJuegos</div>
        </div>

        <ul className="nav-links">
            <li><Link to="/">Inicio</Link></li>

            <li className="submenu">
                <a href="#">Tendencias ▾</a>
                <ul className="dropdown">
                    <li><NavLink to="/">Juegos Del Mes</NavLink></li>
                    <li><NavLink to="/">Mas Hablado</NavLink></li>
                </ul>
            </li>

            <li><NavLink to="/juegos">Juegos</NavLink></li>
            <li><a href="#">Contacto</a></li>
        </ul>

        <div className="navbar-right">
            {usuario ? (
                <div className="usuario">                    
                    <img src={usuario.imagen ? `data:image/jpeg;base64,${usuario.imagen}` : foto} alt="perfil" className="perfil-img" />
                    <span>{usuario.nickname}</span>
                    <button onClick={cerrarSesion} className="cerrar_sesion">Cerrar sesión</button>
                </div>
            ) : (
                <button className="InicioSesion2" onClick={() => navigate("/formulario")}>Iniciar Sesión</button>
            )} {/**El navegate formulario hay que quitarlo */}
        </div>
    </nav>
    );
}

export default ComponentMenu;
