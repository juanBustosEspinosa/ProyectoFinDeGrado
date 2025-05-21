import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ListaMensajes from './ListaMensajes';

function ComponentMensaje({idjuego,idUsuario,mes}){
    const [mensajes,setMensajes] = useState([]);
    
    useEffect(() =>{
        const obtenerMensajes = async (e) => {
          console.log("Estoy en Component Mensaje el juego es " +idjuego);

            
            try {
              let response;
              let ramdom = false;
                //Vamos a hacer una peticion a las Base de datos para sacar los mensajes
                if (idjuego === null && idUsuario === null && !mes){
                  response = await axios.get("http://localhost:8091/Mensaje");
                  ramdom = true;

                } else if(idjuego != null){
                  response = await axios.get("http://localhost:8091/Mensaje/Juego",
                    {params: {id: idjuego}}
                  );
                } else if (mes){
                  response = await axios.get("http://localhost:8091/Mensaje/MensajeMes");
                  ramdom = true;

                }else {
                    response = await axios.get("http://localhost:8091/Mensaje/Usuario",
                    {params: {id: idUsuario}}
                  );
                }
                const mensajeData = response.data;
                if (ramdom){
                  const mezclados = [...mensajeData].sort(() => Math.random() - 0.5);
                  setMensajes(mezclados)
                }else{
                  setMensajes(mensajeData);
                }
                console.log("Mensajes recibidos:", mensajeData);


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
          <ListaMensajes mensajes={mensajes} setMensajes={setMensajes}/>
        )}
      </div>
    )

}

export default ComponentMensaje;