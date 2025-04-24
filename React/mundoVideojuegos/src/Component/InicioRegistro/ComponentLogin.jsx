import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';

function ComponentLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');  // Estado para manejar el mensaje de error
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Llamada a la API con GET para autenticar al usuario
      const response = await axios.get("http://localhost:8091/Usuario/login", {
        params: {
          nickname: username,
          password: password
        }
      });

      // Si el backend devuelve el usuario, inicia sesión y redirige
      if (response.status === 200 && response.data) {
        login(response.data); // Marca al usuario como autenticado en el contexto
        navigate("/"); // Redirige a la página principal
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);

      // Accede al mensaje de error en la respuesta del servidor
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);  // Muestra el mensaje de error enviado por el servidor
      } else {
        setError("Hubo un error al intentar iniciar sesión");
      }
    }
  };

  // Función para redirigir a la página de registro
  const goToRegister = () => {
    navigate("/registro"); // Redirige a la página de registro
  };
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label>Usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ingresa tu usuario"
          />
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
          />
        </div>
        <button type="submit">Iniciar sesión</button>
      {/* Botón para redirigir al registro */}
      <button type="button" onClick={goToRegister}>Registro</button>      
      </form>
      
      {/* Si hay un error, se muestra aquí */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default ComponentLogin;
