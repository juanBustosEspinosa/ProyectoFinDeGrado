import React, { useEffect, useState } from 'react';
import foto from "../../Fotos/foto.png";
import "./ListaMensajes.css";
import ListaRespuesta from './ListaRespuesta';
import axios from 'axios';

function ListaMensajes({ mensajes }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [reacciones, setReacciones] = useState({});
  const [respuestasVisibles, setRespuestasVisibles] = useState({});

  useEffect(() => {
    const obtenerReaccionesUsuario = async () => {
      try {
        const response = await axios.get('http://localhost:8091/LikesDislikes/Usuario', {
          params: { idUsuario: usuario.id } });
        const data = response.data;

        const nuevasReacciones = {};
        data.forEach(reaccion => {
          //Ponemos la interrogacion ? para evitar errores en el codigo ya que pude llegar a darse algun valor nulo esto pasa de ese dato y sigue operando
          if (reaccion?.idMensaje?.id != null) {
            nuevasReacciones[reaccion.idMensaje.id.toString()] = reaccion.tipo;
          }
        });

        console.log("Reacciones cargadas:", nuevasReacciones); // debug
        setReacciones(nuevasReacciones);
      } catch (error) {
        console.error("Error al obtener reacciones del usuario:", error);
      }
    };

    if (usuario?.id) {
      obtenerReaccionesUsuario();
    }
  }, [usuario?.id]);


  const toggleRespuestas = (idMensaje) => {
    setRespuestasVisibles(prev => ({
      ...prev,
      [idMensaje]: !prev[idMensaje]
    }));
  };



  const handleLike = async (id, mensaje) => {
    const mensajeId = id.toString();
    const reaccionActual = reacciones[mensajeId];

    if (reaccionActual === 'like') {
      await axios.delete("http://localhost:8091/LikesDislikes/eliminarMensaje", {
        params: {
          id_Usuario: usuario.id,
          id_Mensaje: id
        }
      });
      mensaje.likes -= 1;
      await axios.put("http://localhost:8091/Mensaje", mensaje);
      setReacciones(prev => ({ ...prev, [mensajeId]: null }));
    } else {
      const likedislike = {
        idUsuario: usuario,
        idMensaje: mensaje,
        idMensajeRespuesta: null,
        tipo: "like"
      };

      if (reaccionActual === 'dislike') {
        mensaje.dislikes -= 1;
      }
      mensaje.likes += 1;
      await axios.put("http://localhost:8091/LikesDislikes", likedislike);
      await axios.put("http://localhost:8091/Mensaje", mensaje);

      setReacciones(prev => ({ ...prev, [mensajeId]: 'like' }));
    }
  };

  const handleDislike = async (id, mensaje) => {
    const mensajeId = id.toString();
    const reaccionActual = reacciones[mensajeId];

    if (reaccionActual === 'dislike') {
      await axios.delete("http://localhost:8091/LikesDislikes/eliminarMensaje", {
        params: {
          id_Usuario: usuario.id,
          id_Mensaje: id
        }
      });
      mensaje.dislikes -= 1;
      await axios.put("http://localhost:8091/Mensaje", mensaje);
      setReacciones(prev => ({ ...prev, [mensajeId]: null }));
    } else {
      const likedislike = {
        idUsuario: usuario,
        idMensaje: mensaje,
        idMensajeRespuesta: null,
        tipo: "dislike"
      };

      if (reaccionActual === 'like') {
        mensaje.likes -= 1;
      }
      mensaje.dislikes += 1;
      await axios.put("http://localhost:8091/LikesDislikes", likedislike);
      await axios.put("http://localhost:8091/Mensaje", mensaje);

      setReacciones(prev => ({ ...prev, [mensajeId]: 'dislike' }));
    }
  };

  return (
    <div>
      <h2>Mensajes:</h2>
      <div className='listaMensaje'>
        {mensajes.map((mensaje, index) => {
          const mensajeId = mensaje.id.toString();
          const reaccionActual = reacciones[mensajeId];

          console.log("Mensaje:", mensaje.id, "Reacción actual:", reaccionActual); // debug

          return (
            <div key={index} className='mensaje'>
              <div className='nicknameUsuario'>
                <div className="infoUsuario">
                  <img className='perfilUsuario' src={foto} alt='perfil' />
                  {mensaje.idUsuario.nickname}
                </div>
                <strong className='tituloJuego'>Reseña de {mensaje.idJuego.nombre}</strong>
              </div>
              <p className='contenidoMensaje'>{mensaje.descripcion}</p>
              <p className='puntuacion'>
                {[...Array(5)].map((_, i) => {
                  const valor = mensaje.puntuacion;
                  if (i + 1 <= Math.floor(valor)) {
                    return <span key={i} className='estrella llena'>★</span>;
                  } else if (i < valor && valor % 1 !== 0) {
                    return <span key={i} className='estrella media'>★</span>;
                  } else {
                    return <span key={i} className='estrella vacia'>★</span>;
                  }
                })}
                <div className="reacciones">
                  <button
                    className={`btn-like ${reaccionActual === 'like' ? 'activo' : ''}`}
                    onClick={() => handleLike(mensaje.id, mensaje)}
                  >
                    👍 {mensaje.likes}
                  </button>

                  <button
                    className={`btn-dislike ${reaccionActual === 'dislike' ? 'activo' : ''}`}
                    onClick={() => handleDislike(mensaje.id, mensaje)}
                  >
                    👎 {mensaje.dislikes}
                  </button>
                </div>
              </p>

              {/**Esto su unica funcion es mostrar las respuestas de cada mensaje */}
              <button className='btn-ver-respuestas' onClick={() => toggleRespuestas(mensaje.id)}>
                {respuestasVisibles[mensaje.id] ? 'Ocultar respuestas' : 'Ver respuestas'}
              </button>
              {/** SI la respuestasVisbles del id es true se mostrara listaRespuesta pero si es falso no se muestra nada ya que se tiene que cumplir la primera opcion */}
              {respuestasVisibles[mensaje.id] && (
                <ListaRespuesta mensajeId={mensaje.id} />
              )}
              </div>
          );
        })}
      </div>
    </div>
  );
}

export default ListaMensajes;
