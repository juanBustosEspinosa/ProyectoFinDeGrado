import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';


function ComponetBusquedaUsuario(){
    const [nickname,setnickname] = useState('');
    const navigate = useNavigate();


    const handleClick = () => {
        navigate(`/BusquedaUsuario?nickname=${nickname}`);
    }

    return (
        <div className="busqueda-container">
            <input
                type="text"
                className="input-Busqueda"
                value={nickname}
                onChange={(e) => setnickname(e.target.value)}
                placeholder="Escribe el nickname del Usuario"
            />    
            <button className='btn-envioBusquedaJuego' onClick={handleClick}>Enviar</button>    
        </div>
    )




}


export default ComponetBusquedaUsuario;