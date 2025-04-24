import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ListaJuegos from "./ListaJuegos";

function ComponentJuego(){
const [juegos ,setJuegos] = useState([]);

useEffect(() => {
    const obtenerJuegos = async (e) => {
        try{
            const resposive = await axios.get("http://localhost:8091/Juego");
            const data = resposive.data;
            setJuegos(data);
        } catch (error){
            console.error("Error al obtener los Juegos:", error);
        }
    }

    obtenerJuegos();
},[]);

console.log(juegos)
return(
        <div>
        {juegos.length === 0 ? (
          <p>No hay juegos para mostrar</p>
        ) : (
          <ListaJuegos juegos={juegos}/>
        )}
      </div>
);

}

export default ComponentJuego;