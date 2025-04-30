import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import "./ButtonPublicar.css"

function ButtonPublicar(){
  const navigate = useNavigate();

    const pressButton = () => {
        navigate("/publicacion");
    }

    return (
        <div className="contenedor-boton">
            <button className="boton-publicar" onClick={pressButton}>Publicar +</button>
        </div>
    )

}


export default ButtonPublicar;