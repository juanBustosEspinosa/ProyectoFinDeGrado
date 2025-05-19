import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ComponentCrearJuego() {
  const navigate = useNavigate();

  const [descripcion, setDescripcion] = useState('');
  const [fechaLanzamiento, setFechaLanzamiento] = useState('');
  const [genero1, setGenero1] = useState('');
  const [genero2, setGenero2] = useState('');
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [imagen, setImagen] = useState('');
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('');
  const [error, setError] = useState('');


    const MAX_SIZE_MB = 25;  // 25 MB es lo maximo que vamos a permitir en la base de datos 
  const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;  // Convertir a bytes

  const handleCrearJuego = async (e) => {
    e.preventDefault();

    if (!fechaLanzamiento) {
      alert("Pon la Fecha de lanzamiento");
      return;
    }

    if (!genero1) {
      alert("No hay genero");
      return;
    }

    
    if (!nombre) {
      alert("No hay nombre del juego");
      return;
    }
    if (!tipo || tipo.trim() === ''){
        alert("no hay un tipo")
        return
    }


    if (!descripcion || descripcion.trim() === ''){
      setDescripcion("No hay mensaje");
    }


    const juegoData = {
      descripcion: descripcion,
      fechaLanzamiento: fechaLanzamiento,
      genero1: genero1,
      genero2: genero2,
      idDesarrollador: usuario,
      imagen: imagen,
      nombre: nombre,
      tipo: tipo, //hay que definirlo
    };

    try {
      const response = await axios.post('http://localhost:8091/Juego', juegoData);
      if (response.status === 200 && response.data) {
      navigate('/juegos');
      }
    } catch (err) {
      setError('Error al crear el juego.');
    }
  };

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
  return (
    <form onSubmit={handleCrearJuego}>
      <h2>Crear Juego</h2>

      <div>
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Descripción:</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Fecha de Lanzamiento:</label>
        <input
          type="date"
          value={fechaLanzamiento}
          onChange={(e) => setFechaLanzamiento(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Género 1:</label>
        <input
          type="text"
          value={genero1}
          onChange={(e) => setGenero1(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Género 2 (opcional):</label>
        <input
          type="text"
          value={genero2}
          onChange={(e) => setGenero2(e.target.value)}
        />
      </div>

      <div>
        <label>Tipo</label>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="">Selecciona una opción</option>
            <option value="singleplayer">singleplayer</option>
            <option value="multiplayer">multiplayer</option>
            <option value="single/multiplayer">single/multiplayer</option>
        </select>
      </div>

    <input
      type="file"
      accept="image/*"
      className="input-imagen"
      onChange={handleFileChange}
    />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button type="submit">Crear Juego</button>
    </form>
  );
}

export default ComponentCrearJuego;
