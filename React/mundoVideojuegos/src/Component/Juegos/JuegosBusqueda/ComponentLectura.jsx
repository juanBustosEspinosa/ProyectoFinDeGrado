import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';


function ComponentLectura(){
    const [nombre,setNombre] = useState('');
    const navigate = useNavigate();


    const handleClick = () => {
        navigate(`/BusquedaJuego?nombre=${nombre}`);
    }

    return (
        <div>
            <input
                type="text"
                className="input-nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Escribe el nombre del juego"
            />    
            <button onClick={handleClick}>Enviar</button>    
        </div>
    )




}


export default ComponentLectura;