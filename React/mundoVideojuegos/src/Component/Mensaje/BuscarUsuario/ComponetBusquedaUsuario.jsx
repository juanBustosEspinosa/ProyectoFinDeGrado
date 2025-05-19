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
        <div>
            <input
                type="text"
                className="input-nickname"
                value={nickname}
                onChange={(e) => setnickname(e.target.value)}
                placeholder="Escribe el nickname del Usuario"
            />    
            <button onClick={handleClick}>Enviar</button>    
        </div>
    )




}


export default ComponetBusquedaUsuario;