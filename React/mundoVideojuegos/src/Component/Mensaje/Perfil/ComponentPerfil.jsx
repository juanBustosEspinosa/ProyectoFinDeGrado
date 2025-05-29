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



  //Se hace este useEffect para pedir los seguidores del usuario/empresa
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


    //se hace este useEffect para pedir todos los seguidos que tiene  
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


  const handleCrearJuego = () => { //te envia a la pagina para crear un juego
    navigate('/CrearJuego');
  } 

    const handleInformacionJuego = () => { //Te lleva a la pagina donde la empresa puede publicar un mensaje especifico de un juego
    navigate('/PublicarMensajeInformatico');
  }

console.log(totalseguidor);
console.log(usuario);

  return(
<div className="perfil-container">
  <div className="perfil-usuario">
      {/** HEADER USUARIO */}
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

          {/** SI EL USUARIO ES TIPO EMPRESA SE MOSTRARA MENSAJES Y JUEGOS PARA PODER VER SUS JUEGOS O MENSAJES */}
  {usuario.tipo === "empresa" && (
    //BOTON MENSAJE
  <button
    className={vistaActiva === "mensajes" ? "tab-activa" : ""}
    onClick={() => setVistaActiva("mensajes")}
  >
    Mensajes
  </button>
  )}
  {usuario.tipo === "empresa" && (
    //BOTON JUEGO
    <button
      className={vistaActiva === "juegos" ? "tab-activa" : ""}
      onClick={() => setVistaActiva("juegos")}
    >
      Juegos
    </button>
  )}

          {/** SI EL USUARIO ES TIPO EMPRESA Y ES EL NO OTRA EMPRESA SE LE PERMITE CREAR JUEGOS */}
  {usuario.id === usuarioLocal.id && usuarioLocal.tipo === "empresa" && (
  <button className='btn-crearjuego-perfil' onClick={handleCrearJuego}>Crear juego</button>
  
)}
    {/** SI EL USUARIO ES TIPO EMPRESA Y ES EL NO OTRA EMPRESA SE LE PERMITE HACER PUBLICACIONES ESPECIFICAS DE UN JUEGO */}
  {usuario.id === usuarioLocal.id && usuarioLocal.tipo === "empresa" && (
  <button className='btn-crearjuego-perfil' onClick={handleInformacionJuego}>Publicacion Informativa</button>
  
)}
</div>
<div className="perfil-contenido">
        {/** PARA VER LOS MENSAJES DEL USUARIO */}
  {vistaActiva === "mensajes" && (
    <ComponentMensaje idjuego={null} idUsuario={usuario.id} mes={false} />
  )}
      {/** PARA VER LOS JUEGOS EN CASO DE QUE SEA EMPRESA */}
  {vistaActiva === "juegos" && (
    <ComponentJuego idUsuario={usuario.id} mes={false}/>
  )}
</div>
</div>
  )




}


export default ComponentPerfil;

