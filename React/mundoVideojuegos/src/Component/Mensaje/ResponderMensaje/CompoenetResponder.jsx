import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "../PublicarMensaje/ComponentPublicar.css";

function ComponentResponder() {
  const [error, setError] = useState(null);  // Estado para mostrar el error
  const [puntuacion, setPuntuacion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState(null);  // Cambié a null, ya que estamos manejando un archivo
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const location = useLocation();
  const mensaje = location.state?.mensaje;


  const MAX_SIZE_MB = 25;  // 25 MB es lo maximo que vamos a permitir en la base de datos 
  const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;  // Convertir a bytes

  /*useEffect(() => {
    if (juego) {
      console.log('Juego seleccionado:', juego);
      setNombre(juego.nombre); // 👈 Opcional: poner el nombre automático
    }
  }, [juego]);*/

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.size > MAX_SIZE_BYTES) {
        setError(`El archivo es demasiado grande. El tamaño máximo permitido es ${MAX_SIZE_MB} MB.`);
        setImagen(null);  // Limpiar el archivo si es muy grande
      } else {
        setError(null);  // Limpiar el error si el archivo es válido
        setImagen(file);  // Guardar el archivo en el estado si es válido
      }
    }
  };

  const handlePublicar = async (e) => {
    e.preventDefault();

    if (!puntuacion) {
      alert("No hay puntuacion");
      return;
    }

    if (!descripcion || descripcion.trim() === ''){
      setDescripcion("No hay mensaje");
    }
    console.log(mensaje);
    const mensajeData = {
      idUsuario: usuario,
      idMensaje: mensaje,
      idJuego: mensaje.idJuego,
      puntuacion: puntuacion,
      descripcion: descripcion,
      likes: 0,
      dislikes: 0,
      imagen: imagen
    };




    try {
      console.log('Mensaje a enviar:', mensajeData);
      const response = await axios.post("http://localhost:8091/MensajeRespuesta", mensajeData);

      console.log('Respuesta de la API:', response.data);

      // Aquí puedes manejar la respuesta, por ejemplo:
      if (response.status === 200) {
        // Si la publicación fue exitosa, podrías mostrar un mensaje de éxito
        console.log("Repuesta publicada correctamente");
        // O navegar a otra página, por ejemplo:
        navigate("/");
      } else {
        // Manejo de error si el código de respuesta no es 200
        alert("Hubo un problema al publicar el mensaje");
      }
    } catch (error){
      console.error(error);
    }
  };


  return (
<div className="form-container">

  <form onSubmit={handlePublicar} className="form-publicar">
    <input
      type="range"
      min="0"
      max="5"
      step="0.1"
      value={puntuacion}
      onChange={(e) => setPuntuacion(parseFloat(e.target.value))}
      className="input-puntuacion"
    />
    <span className="puntuacion-display">{puntuacion}</span>

    <textarea
      className="input-descripcion"
      value={descripcion}
      onChange={(e) => setDescripcion(e.target.value)}
      placeholder="Descripción"
    ></textarea>

    <input
      type="file"
      accept="image/*"
      className="input-imagen"
      onChange={handleFileChange}
    />

    {/* Mostrar el error si el archivo es demasiado grande */}
    {error && <p className="error-message">{error}</p>}

    <button type="submit" className="btn-publicar">Publicar Mensaje</button>
  </form>
</div>
  );
}

export default ComponentResponder;