import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import "./ComponentRegistro.css"

function ComponentRegistro(){

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [telefono, setTelefono] = useState('');
  const [tipo, setTipo] = useState('');
  const [correo, setCorreo] = useState('');
  const [apellido, setApellido] = useState('');
  const [nombre, setNombre] = useState('');
  const [imagen, setImagen] = useState(null);  // Cambié a null, ya que estamos manejando un archivo
  const navigate = useNavigate();


  const MAX_SIZE_MB = 25;  // 25 MB es lo maximo que vamos a permitir en la base de datos 
  const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;  // Convertir a bytes

  const usuarioData = {
    nickname: username,
    contrasena: password,
    telefono: telefono,
    tipo: tipo,
    correo: correo,
    apellido: apellido,
    nombre: nombre,
    imagen: imagen
  };
  const [error, setError] = useState('');
const gotoLogin = () => {
          navigate("/login");
}

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

    const handleLogin = async (e) => {
        e.preventDefault();
            if (telefono < 100000000 || telefono > 999999999) {
              alert("Pon bien tu numero de telefono");
              return;
            }
        try {
          // Llamada a la API con Post para autenticar al usuario
          const response = await axios.post("http://localhost:8091/Usuario", usuarioData);

    
          // Si el backend devuelve el usuario, inicia sesión y redirige
          if (response.status === 200) {

            // login(); // Marca al usuario como autenticado en el contexto
          navigate("/login"); // Redirige a la página principal
          }
        } catch (error) {
          console.error("Error al Registrarse:", error);
    
          // Accede al mensaje de error en la respuesta del servidor
          if (error.response && error.response.data && error.response.data.message) {
            setError(error.response.data.message);  // Muestra el mensaje de error enviado por el servidor
          } else {
            setError("Hubo un error al intentar Registrarse");
          }
        }
      };


    return (
<div className="registro-container"> 
<h1 className="registro-titulo">Registro</h1>
  <form className="registro-form" onSubmit={handleLogin}>
    <div className="registro-input-group">
      <label className="registro-label">Nickname</label>
      <input
        type="text"
        className="registro-input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Ingresa tu usuario"
        required
      />
    </div>

    <div className="registro-input-group">
      <label className="registro-label">Contraseña</label>
      <input
        type="password"
        className="registro-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Ingresa tu contraseña"
        required
      />
    </div>

    <div className="registro-input-group">
      <label className="registro-label">Teléfono</label>
      <input
        type="text"
        className="registro-input"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        placeholder="Ingresa tu teléfono"
        required
      />
    </div>

    <div className="registro-input-group">
      <label className="registro-label">Tipo</label>
      <select
        className="registro-input"
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
      >
        <option value="usuario">Usuario</option>
        <option value="empresa">Empresa</option>
      </select>
    </div>

    <div className="registro-input-group">
      <label className="registro-label">Correo</label>
      <input
        type="email"
        className="registro-input"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        placeholder="Ingresa tu correo"
        required
      />
    </div>

    <div className="registro-input-group">
      <label className="registro-label">Nombre</label>
      <input
        type="text"
        className="registro-input"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Ingresa tu nombre"
        required
      />
    </div>

    <div className="registro-input-group">
      <label className="registro-label">Apellido</label>
      <input
        type="text"
        className="registro-input"
        value={apellido}
        onChange={(e) => setApellido(e.target.value)}
        placeholder="Ingresa tu apellido"
      />
    </div>

    <div className="registro-input-group">
      <label className="registro-label">Foto de perfil</label>
      <input
        type="file"
        accept="image/*"
        className="registro-input-imagen"
        onChange={handleFileChange}
      />
    </div>

    <button className="registro-button" type="submit">Registrar</button>
    <button className="registro-button secondary" type="button" onClick={gotoLogin}>Volver Login</button>
  </form>

  {error && <p className="registro-error">{error}</p>}
</div>
      );


}

export default ComponentRegistro;