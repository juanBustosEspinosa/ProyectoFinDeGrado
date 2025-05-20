import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './ComponentLectura.css'


function ComponentLectura(){
    const [nombre,setNombre] = useState('');
    const navigate = useNavigate();


    const handleClick = () => {
        navigate(`/BusquedaJuego?nombre=${nombre}`);
    }

    return (
        <div className="busqueda-container">
            <input
                type="text"
                className="input-Busqueda"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Escribe el nombre del juego"
            />    
            <button className='btn-envioBusquedaJuego' onClick={handleClick}>Enviar</button>    
        </div>
    )




}


export default ComponentLectura;