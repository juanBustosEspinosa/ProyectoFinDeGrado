import React, { useEffect, useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';



function CompoenetMensajesJuego(juegoId){

const [mensajes, setMensajes] = useState([]);
useEffect(() => {
    const obtenerMensajes = async (e) => {
        try{
            const resposive = await axios.get("http://localhost:8091/Mensajes/Juego",{
                params: { idJuego: juegoId }}

            );
            const data = resposive.data;
            setMensajes(data);
        } catch (error){
            console.error("Error al obtener los Mensajes:", error);
        }
    }

    obtenerMensajes();
},[]);

return(
    <div>
        <ul>
            {mensajes.map(mensajes,index => (
                <li>index</li>
            )) }
        </ul>
    </div>
)



}


export default CompoenetMensajesJuego;