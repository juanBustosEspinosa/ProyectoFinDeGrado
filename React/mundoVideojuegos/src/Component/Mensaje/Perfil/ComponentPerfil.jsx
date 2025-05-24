import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import foto from "../../../Fotos/foto.webp"
import ComponentMensaje from '../ComponentMensaje';
import './ComponentPerfil.css'
import ComponentJuego from '../../Juegos/ComponentJuego';



function ComponentPerfil(){

const usuarioLocal = JSON.parse(localStorage.getItem("usuario"));
const [totalseguidores, setSeguidores] = useState("");
const [totalseguidor, setSeguidor] = useState("");
const { state } = useLocation();
const usuario = state?.usuario;
const [vistaActiva, setVistaActiva] = useState("mensajes"); // valores posibles: 'mensajes', 'juegos'
const navigate = useNavigate();


  useEffect(() => {
    const obtenerTotalSeguidores = async () => {
      try {
        const response = await axios.get('http://localhost:8091/Seguir/seguidor', {
          params: { idSeguidor: usuario.id } });
        const data = response.data;


        setSeguidores(data);
      } catch (error) {
        console.error("Error al obtener Seguidores: ", error);
      }
    };

      obtenerTotalSeguidores();
  }, [usuario?.id]);


    useEffect(() => {
    const obtenerTotalSeguidor = async () => {
      try {
        const response = await axios.get('http://localhost:8091/Seguir/seguido', {
          params: { idSeguido: usuario.id } });
        const data = response.data;


        setSeguidor(data);
      } catch (error) {
        console.error("Error al obtener Seguidores: ", error);
      }
    };

      obtenerTotalSeguidor();
  }, [usuario?.id]);


  const handleCrearJuego = () => {
    navigate('/CrearJuego');
  }

    const handleInformacionJuego = () => { //adadas
    navigate('/PublicarMensajeInformatico');
  }

console.log(totalseguidor);
console.log(usuario);

  return(
<div className="perfil-container">
  <div className="perfil-usuario">
    <div className='perfil-usuario-header'>
    <img
      className="perfil-imagen"
      src={usuario.imagen ? `data:image/jpeg;base64,${usuario.imagen}` : foto}
      alt="perfil"
    />
    <h1 className='titulo-perfil'>{usuario.nickname}</h1>
    </div>
    <div className='perfil-usuario-body'>
    <p className='fecha-perfil'>Fecha de creación: {usuario.fechaInicio}</p>
    <p className='tipo-perfil'>Tipo: {usuario.tipo}</p>
    <p className='total-perfil'>Seguidores: {totalseguidores}</p>
    <p className='total-perfil'>Seguidos: {totalseguidor}</p>

  </div>
  </div>

<div className="perfil-tabs">
  {usuario.tipo === "empresa" && (
  <button
    className={vistaActiva === "mensajes" ? "tab-activa" : ""}
    onClick={() => setVistaActiva("mensajes")}
  >
    Mensajes
  </button>
  )}
  {usuario.tipo === "empresa" && (
    <button
      className={vistaActiva === "juegos" ? "tab-activa" : ""}
      onClick={() => setVistaActiva("juegos")}
    >
      Juegos
    </button>
  )}
  {usuario.id === usuarioLocal.id && usuarioLocal.tipo === "empresa" && (
  <button className='btn-crearjuego-perfil' onClick={handleCrearJuego}>Crear juego</button>
  
)}
  {usuario.id === usuarioLocal.id && usuarioLocal.tipo === "empresa" && (
  <button className='btn-crearjuego-perfil' onClick={handleInformacionJuego}>Publicacion Informativa</button>
  
)}
</div>
<div className="perfil-contenido">
  {vistaActiva === "mensajes" && (
    <ComponentMensaje idjuego={null} idUsuario={usuario.id} mes={false} />
  )}

  {vistaActiva === "juegos" && (
    <ComponentJuego idUsuario={usuario.id} mes={false}/>
  )}
</div>
</div>
  )




}


export default ComponentPerfil;

