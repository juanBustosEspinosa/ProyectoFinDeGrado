import React, { useEffect, useState } from 'react';
import foto from "../../Fotos/foto.webp";
import "./ListaMensajes.css";
import ListaRespuesta from './ListaRespuesta';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';




function ListaMensajes({ mensajes,setMensajes}) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [reacciones, setReacciones] = useState({});
  const [respuestasVisibles, setRespuestasVisibles] = useState({});
  const navigate = useNavigate();
  const [suscripciones, setSuscripciones] = useState([]);



useEffect(() => {
  const obtenerSuscripciones = async () => {
    try {
      const response = await axios.get('http://localhost:8091/Seguir', {
        params: { idUsuario: usuario.id }
      });

      // Accede correctamente a los usuarios seguidos (debes verificar cómo se estructura la respuesta)
      const datos = response.data; // Asegúrate de que la respuesta sea 'response.data' y no 'response.datos'
      
      // Extrae los IDs de los usuarios seguidos
      const idsSeguidos = datos.map(u => u.idSeguido.id); // Aquí se asume que 'idSeguido' es el campo correcto
      setSuscripciones(idsSeguidos);

    } catch (error) {
      console.error("Error al cargar suscripciones:", error);
    }
  };

  if (usuario?.id) {
    obtenerSuscripciones();
  }
}, [usuario?.id]);

  

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


  const handleSuscripcion = async (idSeguido) => {
  try {
    const yaSigue = suscripciones.includes(idSeguido);

    if (yaSigue) {
      const nueva = {
        idSeguidor: { id: usuario.id },  
        idSeguido: { id: idSeguido }     
      };

      await axios.delete("http://localhost:8091/Seguir", {
        headers: {
          'Content-Type': 'application/json'
        },
        data: nueva
      });

      // Actualizamos el estado de las suscripciones
      setSuscripciones(prev => prev.filter(id => id !== idSeguido));
    } else {
      const nueva = {
        idSeguidor: { id: usuario.id },   
        idSeguido: { id: idSeguido }     
      };
      await axios.post('http://localhost:8091/Seguir', nueva, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Actualizamos el estado de las suscripciones
      setSuscripciones(prev => [...prev, idSeguido]);
    }
  } catch (error) {
    console.error("Error al (des)seguir usuario:", error);
  }
};

const handleEliminarPublicacion = async (id) => {
  try {
    const responsive =await axios.get('http://localhost:8091/LikesDislikes/Respuestas', {
      params: { idMensajeRespuesta: id}
    })
    const data = responsive.data;
    
    console.log(data)
    data.forEach(respuesta => {
        axios.delete('http://localhost:8091/LikesDislikes/eliminarRespuestaALL',{
      params:{idMensajeRespuesta: respuesta.id}
    })
      
    });

    await axios.delete('http://localhost:8091/MensajeRespuesta/EliminarRespuestas',{
      params: {idMensaje:  id}
    });
    await axios.delete('http://localhost:8091/LikesDislikes/eliminarMensajeALL',{
      params:{idMensaje: id}
    })
    await axios.delete('http://localhost:8091/Mensaje/EliminarMensaje',{
      params:{id: id}
    });
    //Aqui actualizo los mensajes para que se eliminen
    setMensajes(prev => prev.filter(m => m.id !== id));

  } catch(error){
    console.error("Error al Eliminar:", error);
  }

}





const irAlPerfil = (usuario) => {
  navigate('/Perfil', { state: { usuario } });
};



      console.log(suscripciones)



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


  const HandleRespuesta = (mensaje) => {
    navigate("/Responder", { state: { mensaje } });
  };


  return (
    <div>
      <div className='listaMensaje'>
        {mensajes.map((mensaje, index) => {
          const mensajeId = mensaje.id.toString();
          const reaccionActual = reacciones[mensajeId];
          console.log("Mensaje:", mensaje.id, "Reacción actual:", reaccionActual); // debug

          return (
            <div key={index} className='mensaje'>
              <div className='nicknameUsuario'>
                <div className="infoUsuario">
                <img className='perfilUsuario' src={mensaje.idUsuario.imagen ? `data:image/jpeg;base64,${mensaje.idUsuario.imagen}` : foto} alt='perfil' />
                <a onClick={() => irAlPerfil(mensaje.idUsuario)} > {/**Hay que poner un style para que se vea cada vez que pasa el raton */}
                  {mensaje.idUsuario.nickname}
                </a>
              {mensaje.idUsuario.id !== usuario.id && (
                <button
                className={`btn-suscribirse ${suscripciones.includes(mensaje.idUsuario.id) ? 'siguiendo' : ''}`}
                onClick={() => handleSuscripcion(mensaje.idUsuario.id)}
                >
                  {suscripciones.includes(mensaje.idUsuario.id) ? 'Siguiendo' : 'Seguir'}   
                </button>
            )}
                </div>
                { mensaje.idUsuario.id == usuario.id&& (
                  <button className='btn-eliminar' onClick={() => handleEliminarPublicacion(mensaje.id)}> Eliminar Mensaje</button>
                )}
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
              <button className='btn-responder' onClick={() => HandleRespuesta(mensaje)}>Responder</button>
              
              {/** SI la respuestasVisbles del id es true se mostrara listaRespuesta pero si es falso no se muestra nada ya que se tiene que cumplir la primera opcion */}
              {respuestasVisibles[mensaje.id] && (
                <ListaRespuesta mensajeId={mensaje.id} suscripciones={suscripciones} handleSuscripcion={handleSuscripcion} />
              )}
              </div>
          );
        })}
      </div>
    </div>
  );
}

export default ListaMensajes;
