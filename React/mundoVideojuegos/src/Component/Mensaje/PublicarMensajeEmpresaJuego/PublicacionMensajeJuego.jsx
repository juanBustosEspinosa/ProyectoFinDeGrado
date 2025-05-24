import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function PublicacionMensajeJuego() {
  const [error, setError] = useState(null);  // Estado para mostrar el error
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('informe');
  const [puntuacion, setPuntuacion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState(null);  // Cambié a null, ya que estamos manejando un archivo
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const location = useLocation();
  const juego = location.state?.juego; // El juego seleccionado

  const MAX_SIZE_MB = 25;  // 25 MB es lo maximo que vamos a permitir en la base de datos 
  const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;  // Convertir a bytes

  useEffect(() => {
    if (juego) {
      console.log('Juego seleccionado:', juego);
      setNombre(juego.nombre); // 👈 Opcional: poner el nombre automático
    }
  }, [juego]);

const handleFileChange = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    const base64String = reader.result.split(',')[1]; // solo base64
    setImagen(base64String); // esto es lo que espera el backend
  };

  if (file) {
    reader.readAsDataURL(file); // importante usar .readAsDataURL
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
    const mensajeData = {
      idUsuario: usuario,
      idJuego: juego,
      tipo: tipo,
      puntuacion: puntuacion,
      likes: 0,
      dislikes: 0,
      descripcion: descripcion,
      imagen: imagen
    };

    console.log('Mensaje a enviar:', mensajeData);



    try {
      const response = await axios.post("http://localhost:8091/Mensaje", mensajeData);
      console.log('Respuesta de la API:', response.data);

      // Aquí puedes manejar la respuesta, por ejemplo:
      if (response.status === 200) {
        // Si la publicación fue exitosa, podrías mostrar un mensaje de éxito
        console.log("Mensaje publicado correctamente");
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

  const handleClick = () => {
    navigate('/EleccionJuego', { state: { empresa: true } });
  };

  return (
<div className="form-container">
  <h1 className='publicar-titulo'>Publicar Mensaje</h1>
  <input
    type="text"
    className="input-nombre"
    value={nombre}
    onChange={(e) => setNombre(e.target.value)}
    placeholder="nombre del juego"
  />
  <button type="button" className="btn-buscar" onClick={handleClick}>Buscar Juego</button>

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

    <div className="registro-input-group">
      <label className="registro-label">Tipo</label>
      <select
        className="registro-input"
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
      >
        <option value="informe">Informativo</option>
        <option value="futuro">Futuro Juego</option>
      </select>
    </div>

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

export default PublicacionMensajeJuego;