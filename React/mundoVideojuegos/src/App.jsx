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
import CompoenetBusqueda from './Component/Juegos/JuegosBusqueda/ComponentBusqueda';
import ComponentLectura from './Component/Juegos/JuegosBusqueda/ComponentLectura';
import ComponetBusquedaUsuario from './Component/Mensaje/BuscarUsuario/ComponetBusquedaUsuario'
import ComponentMostrarUsuario from './Component/Mensaje/BuscarUsuario/ComponentMostrarUsuario';
import ComponentJuegoDetallado from './Component/Juegos/DetallesJuego/ComponentJuegoDetallado';
import ComponentPerfil from './Component/Mensaje/Perfil/ComponentPerfil';
import ComponentCrearJuego from './Component/Juegos/CrearJuego/CompoenetCrearJuego';

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
              <ComponentMensaje idjuego={null} idUsuario={null} />
            </div>
            <ComponetBusquedaUsuario />

            {/* Botón de "Publicar" fijo en la parte inferior */}
            <ButtonPublicar className="publicar-fijo" />
          </div> : <Navigate to="/login" />}
        />
        {/** Te envia al registro para que el usuario se cree su cuenta */}
        <Route
          path='/registro'
          element=  {<ComponentRegistro/>}
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
              <ComponentJuego idUsuario={null} />
              <ComponentLectura/>
            </div>
          </div>: <Navigate to="/login"/> }
        />

        {/** Boton que te permite publicar un mensaje sobre un juego */}
        <Route
        path='/publicacion'
        element={isAuthenticated ? <div><ComponentMenu/> <ComponentPublicar/> </div> : <Navigate to="/login"/>}
        />

        <Route
        path='/Responder'
        element={isAuthenticated ? <div><ComponentMenu/>  <ComponentResponder/> </div> : <Navigate to="/login"/>}
        />  


        <Route
        path="/EleccionJuego"
        element={isAuthenticated ? <div><BusquedaSeleccionCompoenet /> </div>: <Navigate to="/login"/>}
        />
        <Route
        path="/Perfil"
        element={isAuthenticated ? <div><ComponentMenu/> <ComponentPerfil /> </div>: <Navigate to="/login"/>}
        />
        
        
        {/**Esta ruta te lleva a detalles del juego */}
        <Route
        path="/DetalleJuego"
        element={isAuthenticated ? <div>  <ComponentMenu/>   <ComponentJuegoDetallado /> </div>: <Navigate to="/login"/>}
        />
          <Route
        path="/CrearJuego"
        element={isAuthenticated ? <div>  <ComponentMenu/>   <ComponentCrearJuego /> </div>: <Navigate to="/login"/>}
        />

        <Route
        path="/BusquedaJuego"
        element={isAuthenticated ? <div> <ComponentMenu/> <CompoenetBusqueda/> </div>: <Navigate to="/login"/>}
        />

        <Route
        path="/BusquedaUsuario"
        element={isAuthenticated ? <div> <ComponentMenu/> <ComponentMostrarUsuario/> </div>: <Navigate to="/login"/>}
        />



      </Routes>
    </Router>
  );
}


export default App;