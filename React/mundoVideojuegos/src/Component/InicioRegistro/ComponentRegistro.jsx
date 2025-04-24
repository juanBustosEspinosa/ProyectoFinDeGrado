import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';

function ComponentRegistro(){

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [telefono, setTelefono] = useState('');
  const [tipo, setTipo] = useState('');
  const [correo, setCorreo] = useState('');
  const [apellido, setApellido] = useState('');
  const [nombre, setNombre] = useState('');
  const navigate = useNavigate();

  const usuarioData = {
    nickname: username,
    contrasena: password,
    telefono: telefono,
    tipo: tipo,
    correo: correo,
    apellido: apellido,
    nombre: nombre
  };
  const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
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
        <div>
          <form onSubmit={handleLogin}>

            {/* NICKNAME */}


            <div>
              <label>Nickname</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingresa tu usuario"
              />
            </div>

            {/* CONTRASEÑA */}


            <div>
              <label>Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
              />
            </div>

            {/* TELEFONO */}


            <div>
              <label>Telefono</label>
              <input
                type="text"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="Ingresa tu Telefono"
              />
            </div>

            {/* TIPO */}


            <div>
                <label>Tipo</label>
                <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                    <option value="">Selecciona una opción</option>
                    <option value="empresa">Empresa</option>
                    <option value="usuario">Usuario</option>
                </select>
            </div>

            {/* CORREO */}


            <div>
                <label>Correo</label>
                <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="Ingresa tu correo"
                />
            </div>

            {/* NOMBRE */}

            <div>
                <label>Nombre</label>
                <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ingresa tu Nombre"
                />
            </div>
            
            
            {/* APELLIDO */}
            <div>
                <label>Apellido</label>
                <input
                type="text"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                placeholder="Ingresa tu Apellido"
                />
            </div>


            <button type="submit">Registro</button>
          </form>
          
          {/* Si hay un error, se muestra aquí */}
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      );


}

export default ComponentRegistro;