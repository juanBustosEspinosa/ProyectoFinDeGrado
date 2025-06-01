import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ListaJuegos from "./ListaJuegos";

function ComponentJuego({idUsuario, mes}){ 
const [juegos ,setJuegos] = useState([]); //Aqui se guardan los juegos


//Aqui se ve que peticion se debe de hacer para guardar los juegos
useEffect(() => {
    const obtenerJuegos = async (e) => {
      let responsive;
        try{
            if (idUsuario == null && !mes ){
              responsive = await axios.get("http://localhost:8091/Juego"); //peticion de todos los juegos

            }else if (mes){
              responsive = await axios.get("http://localhost:8091/Juego/JuegoMes"); //peticion de los juegos que han salido este mes
            } 
            else {
              responsive = await axios.get("http://localhost:8091/Juego/BuscarJuegosUsuario", { 
                params: { id: idUsuario}
              }) // Aqui buscamos los juegos que tiene una empresa
            }
              const data = responsive.data;
              setJuegos(data);

        } catch (error){
            console.error("Error al obtener los Juegos:", error);
        }
    }

    obtenerJuegos();
},[]);

console.log(juegos) //Comprobamos los datos que nos da
return(
        <div>

          {/** Comprobamos si hay juegos, si los hay llamamos a lista juego */}
        {juegos.length === 0 ? (
          <p>No hay juegos para mostrar</p>
        ) : (
          <ListaJuegos juegos={juegos}/>
        )}
      </div>
);

}

export default ComponentJuego;