import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import './ComponentLogin.css'

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
<div className="login-container">
  <h1 className="login-titulo">Login</h1>
  <form onSubmit={handleLogin} className="login-form">
    <div className="login-input-group">
      <label className="login-label">Usuario</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Ingresa tu usuario"
        className="login-input"
      />
    </div>
    <div className="login-input-group">
      <label className="login-label">Contraseña</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Ingresa tu contraseña"
        className="login-input"
      />
    </div>
    <button type="submit" className="login-button">Iniciar sesión</button>
    <button type="button" onClick={goToRegister} className="login-button secondary">Registro</button>
  </form>

  {error && <p className="login-error">{error}</p>}
</div>
  );
}

export default ComponentLogin;
