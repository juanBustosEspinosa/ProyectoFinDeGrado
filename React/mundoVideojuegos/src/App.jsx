import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { AuthContext } from './Component/AuthContext'; // Importar AuthContext directamente
import ComponentLogin from './Component/InicioRegistro/ComponentLogin';
import ComponentRegistro from './Component/InicioRegistro/ComponentRegistro';
import ComponentMenu from './Component/Menu/ComponentMenu';
import ComponentMensaje from './Component/Mensaje/ComponentMensaje';
import ComponentJuego from './Component/Juegos/ComponentJuego';
import ButtonPublicar from './Component/Mensaje/PublicarMensaje/ButtonPublicar';
import ComponentPublicar from './Component/Mensaje/PublicarMensaje/ComponentPublicar';
import BusquedaSeleccionCompoenet from './Component/Juegos/JuegosBusqueda/BusquedaSeleccionCompoenet'
import ComponentResponder from './Component/Mensaje/ResponderMensaje/CompoenetResponder';


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
          element={isAuthenticated ?     <div className="pagina-contenedor">
            {/* Menú fijo en la parte superior */}
            <div className="menu-fijo">
              <ComponentMenu />
            </div>

            {/* Contenedor para los mensajes o el contenido dinámico */}
            <div className="contenido-principal">
              <ComponentMensaje />
            </div>

            {/* Botón de "Publicar" fijo en la parte inferior */}
            <ButtonPublicar className="publicar-fijo" />
          </div> : <Navigate to="/login" />}
        />
        {/** Te envia al registro para que el usuario se cree su cuenta */}
        <Route
          path='/registro'
          element=  {<ComponentRegistro></ComponentRegistro>}
        />
        {/**Compoenete que te lleva al apartado general de los juegos */}
        <Route
        path='/juegos'
        element={isAuthenticated ?
          <div className="contenedor-juegos">
            <div className="menu-fijo">
              <ComponentMenu />
            </div>
            <div className="contenido-juego">
              <ComponentJuego />
            </div>
          </div>: <Navigate to="/login"/> }
        />

        {/** Boton que te permite publicar un mensaje sobre un juego */}
        <Route
        path='/publicacion'
        element={isAuthenticated ? <div><ComponentMenu></ComponentMenu>  <ComponentPublicar></ComponentPublicar> </div> : <Navigate to="/login"/>}
        />

        <Route
        path='/Responder'
        element={isAuthenticated ? <div><ComponentMenu></ComponentMenu>  <ComponentResponder/> </div> : <Navigate to="/login"/>}
        />  


        <Route
        path="/EleccionJuego"
        element={isAuthenticated ? <div><BusquedaSeleccionCompoenet /> </div>: <Navigate to="/login"/>}
        />


      </Routes>
    </Router>
  );
}


export default App;