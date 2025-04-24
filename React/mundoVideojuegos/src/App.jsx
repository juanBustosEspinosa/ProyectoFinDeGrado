import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { AuthContext } from './Component/AuthContext'; // Importar AuthContext directamente
import ComponentLogin from './Component/InicioRegistro/ComponentLogin';
import ComponentRegistro from './Component/InicioRegistro/ComponentRegistro';
import ComponentMenu from './Component/Menu/ComponentMenu';
import ComponentMensaje from './Component/Mensaje/ComponentMensaje';
import ComponentJuego from './Component/Juegos/ComponentJuego';


function App() {
  const { isAuthenticated } = useContext(AuthContext); // Obtener el estado de autenticación desde el contexto

  return (
    
    <Router>
      <Routes>
        {/* Ruta para el login */}
        <Route path="/login" element={<ComponentLogin />} />

        {/* Ruta protegida: Si no está autenticado, redirige a /login */}
        <Route
          path="/formulario"
          element={isAuthenticated ? <p>Bienvenido al formulario</p> : <Navigate to="/login" />}
        />

        {/* Ruta principal: Solo accesible si estás autenticado */}
        <Route
          path="/"
          element={isAuthenticated ? <div> <ComponentMenu></ComponentMenu> <ComponentMensaje></ComponentMensaje> <p>Bienvenido a la página principal</p> </div>: <Navigate to="/login" />}
        />
        <Route
          path='/registro'
          element=  {<ComponentRegistro></ComponentRegistro>}
        />

        <Route
        path='/juegos'
        element={isAuthenticated ? <div><ComponentMenu></ComponentMenu> <ComponentJuego></ComponentJuego> </div>: <Navigate to="/login"/> }
        />





      </Routes>
    </Router>
  );
}


export default App;