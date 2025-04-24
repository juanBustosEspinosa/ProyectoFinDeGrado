import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ListaMensajes from './ListaMensajes';

function ComponentMensaje(){
    const [mensajes,setMensajes] = useState([]);
    
    useEffect(() =>{
        const obtenerMensajes = async (e) => {

            
            try {
                //Vamos a hacer una peticion a las Base de datos para sacar los mensajes
                const response = await axios.get("http://localhost:8091/Mensaje");
                const mensajeData = response.data;
                setMensajes(mensajeData);
                console.log("Mensajes recibidos:", mensajeData);

                //Mediante un map vamos haciendo peticiones para saber los usuarios del mensaje
                /**const peticionUsuarios = mensajeData.map((mensaje)=>
                  axios.get(`http://localhost:8091/Usuario/${mensaje.id_usuario}`)
                );
    
                //Esperamos a que nos devuelva todo porque sino puede dar error
                const respuestasUsuarios = await Promise.all(peticionUsuarios);
                
                setUsuarios(respuestasUsuarios);*/

            } catch(error) {
                console.error("Error al obtener los mensajes:", error);
    
            }
        };

        obtenerMensajes();
    },[]);

    return (
        <div>
        {mensajes.length === 0 ? (
          <p>No hay mensajes para mostrar</p>
        ) : (
          <ListaMensajes mensajes={mensajes}/>
        )}
      </div>
    )

}

export default ComponentMensaje;