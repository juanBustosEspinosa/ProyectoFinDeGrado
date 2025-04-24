import React, { useEffect, useState } from 'react';
import axios from 'axios';
import foto from "../../Fotos/foto.png";
import "./ListaRespuesta.css";


function ListaRespuesta({ mensajeId }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [respuestas, setRespuestas] = useState([]);
  const [reacciones, setReacciones] = useState({});

  // Obtener respuestas del mensaje
  useEffect(() => {
    const obtenerRespuestas = async () => {
      try {
        const response = await axios.get("http://localhost:8091/MensajeRespuesta/ListaRespuesta", {
          params: { idMensaje: mensajeId }
        });
        setRespuestas(response.data);
      } catch (error) {
        console.error("Error al obtener respuestas:", error);
      }
    };

    obtenerRespuestas();
  }, [mensajeId]);

  // Obtener reacciones del usuario a las respuestas
  useEffect(() => {
    const obtenerReaccionesUsuario = async () => {
      try {
        const response = await axios.get("http://localhost:8091/LikesDislikes/Usuario", {
          params: { idUsuario: usuario.id }
        });

        const nuevasReacciones = {};
        response.data.forEach(reaccion => {
          if (reaccion.idMensajeRespuesta) {
            nuevasReacciones[reaccion.idMensajeRespuesta.id.toString()] = reaccion.tipo;
          }
        });

        setReacciones(nuevasReacciones);
      } catch (error) {
        console.error("Error al obtener reacciones del usuario (respuestas):", error);
      }
    };

    if (usuario?.id) {
      obtenerReaccionesUsuario();
    }
  }, [usuario?.id]);

  const handleLikeRespuesta = async (respuesta) => {
    const respuestaId = respuesta.id.toString();
    const reaccionActual = reacciones[respuestaId];
console.log(respuesta);
    if (reaccionActual === 'like') { //Like
      await axios.delete("http://localhost:8091/LikesDislikes/eliminarRespuesta", {
        params: {
          id_Usuario: usuario.id,
          id_Respuesta: respuesta.id
        }
      });
      respuesta.likes -= 1;
      await axios.put("http://localhost:8091/MensajeRespuesta", respuesta);
      setReacciones(prev => ({ ...prev, [respuestaId]: null }));
    } else {
      const likedislike = {
        idUsuario: usuario,
        idMensaje: null,
        idMensajeRespuesta: respuesta,
        tipo: "like"
      };

      if (reaccionActual === 'dislike') {
        respuesta.dislikes -= 1;
      }

      respuesta.likes += 1;
      await axios.put("http://localhost:8091/LikesDislikes/Respuesta", likedislike);
      await axios.put("http://localhost:8091/MensajeRespuesta", respuesta);

      setReacciones(prev => ({ ...prev, [respuestaId]: 'like' }));
    }
  };

  const handleDislikeRespuesta = async (respuesta) => {
    const respuestaId = respuesta.id.toString();
    const reaccionActual = reacciones[respuestaId];

    if (reaccionActual === 'dislike') { //Like
      await axios.delete("http://localhost:8091/LikesDislikes/eliminarRespuesta", {
        params: {
          id_Usuario: usuario.id,
          id_Respuesta: respuesta.id
        }
      });
      respuesta.dislikes -= 1;
      await axios.put("http://localhost:8091/MensajeRespuesta", respuesta);
      setReacciones(prev => ({ ...prev, [respuestaId]: null }));
    } else {
      const likedislike = {
        idUsuario: usuario,
        idMensaje: null,
        idMensajeRespuesta: respuesta,
        tipo: "dislike"
      };

      if (reaccionActual === 'like') {
        respuesta.likes -= 1;
      }

      respuesta.dislikes += 1;
      await axios.put("http://localhost:8091/LikesDislikes/Respuesta", likedislike);
      await axios.put("http://localhost:8091/MensajeRespuesta", respuesta);

      setReacciones(prev => ({ ...prev, [respuestaId]: 'dislike' }));
    }
  };

  return (
    <div className='lista-respuestas'>
      {respuestas.map((respuesta, index) => {
        const reaccionActual = reacciones[respuesta.id.toString()];
        return (
          <div key={index} className='respuesta'>
            <div className='nicknameUsuario'>
              <div className="infoUsuario">
                <img className='perfilUsuario' src={foto} alt='perfil' />
                {respuesta.idUsuario.nickname}
              </div>
            </div>
            <p className='contenidoMensaje'>{respuesta.descripcion}</p>
            <p className='puntuacion'>
              {[...Array(5)].map((_, i) => {
                const valor = respuesta.puntuacion;
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
                  onClick={() => handleLikeRespuesta(respuesta)}
                >
                  👍 {respuesta.likes}
                </button>

                <button
                  className={`btn-dislike ${reaccionActual === 'dislike' ? 'activo' : ''}`}
                  onClick={() => handleDislikeRespuesta(respuesta)}
                >
                  👎 {respuesta.dislikes}
                </button>
              </div>
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default ListaRespuesta;
