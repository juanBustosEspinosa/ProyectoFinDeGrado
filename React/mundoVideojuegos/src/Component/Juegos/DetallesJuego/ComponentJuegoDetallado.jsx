import React, { useEffect, useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';
import "./ComponentJuegoDetallado.css";
import CompoenetMensaje from '../../Mensaje/ComponentMensaje';



function ComponentJuegoDetallado() {
    
    const { state } = useLocation();
    const juego = state?.juego;

    console.log(juego.id);
    return ( 
<div className="juego-detalle-container">
  <div className="juego-detalle-card">
    <img
      className="juego-portada"
      src={`data:image/jpeg;base64,${juego.imagen}`}
      alt={`Portada de ${juego.nombre}`}
    />
    <div className="juego-info">
      <h2 className="juego-nombre">{juego.nombre}</h2>
      <p><strong>Desarrollador:</strong> {juego.idDesarrollador.nickname}</p>
      <p><strong>Fecha de lanzamiento:</strong> {juego.fechaLanzamiento}</p>
      <p><strong>Género:</strong> {juego.genero1}{juego.genero2 ? ` / ${juego.genero2}` : ''}</p>
      <p><strong>Tipo:</strong> {juego.tipo}</p>
      <h1 className="juego-nombre">Descripcion</h1>
      <p className="juego-descripcion">{juego.descripcion}</p>
    </div>
      <div className='juego-mensajes'>
      <CompoenetMensaje idjuego={juego.id} idUsuario={null}/>
    </div>
  </div>

</div>


    )


}


export default ComponentJuegoDetallado;