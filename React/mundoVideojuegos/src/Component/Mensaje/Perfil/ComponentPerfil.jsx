import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import foto from "../../../Fotos/foto.webp"
import ComponentMensaje from '../ComponentMensaje';
import './ComponentPerfil.css'
import ComponentJuego from '../../Juegos/ComponentJuego';



function ComponentPerfil(){
//Hay que modificar ComponentMensaje para que solo salgan sus mensajes 
//Hay que hacer las consulta en spring boot 
//hay que hacer dos consultar en spring boot una para saber los que siguen al usuario y otra para saber a los que le siguen
//Hay que hacer dos peticiones para saber los seguidos y los que le siguen

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


console.log(totalseguidor);
console.log(usuario);

  return(
<div className="perfil-container">
  <div className="perfil-usuario">
    <img
      className="perfil-imagen"
      src={usuario.imagen ? `data:image/jpeg;base64,${usuario.imagen}` : foto}
      alt="perfil"
    />
    <h1>{usuario.nickname}</h1>
    <p>Fecha de creación: {usuario.fechaInicio}</p>
    <p>Tipo: {usuario.tipo}</p>
    <p>Seguidores: {totalseguidores}</p>
    <p>Seguidos: {totalseguidor}</p>
    { usuario.id == usuarioLocal.id && (
    <button onClick={handleCrearJuego}>Crear juego</button>
    )}
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
</div>
<div className="perfil-contenido">
  {vistaActiva === "mensajes" && (
    <ComponentMensaje idjuego={null} idUsuario={usuario.id} />
  )}

  {vistaActiva === "juegos" && (
    <ComponentJuego idUsuario={usuario.id} />
  )}
</div>
</div>
  )




}


export default ComponentPerfil;

