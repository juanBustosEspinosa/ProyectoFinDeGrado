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
import ComponentFooter from './Component/Footer/ComponentFooter';

function App() {
  const { isAuthenticated } = useContext(AuthContext); // Obtener el estado de autenticación desde el contexto

  return (
    
    <Router>
      <Routes>
        {/* Ruta para el login */}
        <Route path="/login" element={<ComponentLogin />} />

                {/** Te envia al registro para que el usuario se cree su cuenta */}
        <Route path='/registro' element=  {<ComponentRegistro/>} />

        {/* Ruta protegida: Si no está autenticado, redirige a /login */}
        <Route
          path="/formulario"
          element={isAuthenticated ? <p>Bienvenido al formulario</p> : <Navigate to="/login" />}
        />




        {/* Ruta principal: Solo accesible si estás autenticado */}
        <Route
          path="/"
          element={isAuthenticated ?     
          <div className="pagina-contenedor">
            {/* Menú fijo en la parte superior */}
            <div className="menu-fijo">
              <ComponentMenu />
            </div>

            {/* Contenedor para los mensajes o el contenido dinámico */}
            <div className="contenido-principal">
              <ComponetBusquedaUsuario />

              <ComponentMensaje idjuego={null} idUsuario={null} />
            </div>
            

            {/* Botón de "Publicar" fijo en la parte inferior */}
            <ButtonPublicar />
            <div className='footer'>
              <ComponentFooter />
            </div>
          </div> : <Navigate to="/login" />}
        />




        {/**Compoenete que te lleva al apartado general de los juegos */}
        <Route
        path='/juegos'
        element={isAuthenticated ?
          <div className="pagina-contenedor">
              <div className="menu-fijo">
                <ComponentMenu />
              </div> 
          <div className="contenedor-juegos">
          
            <div className="contenido-juego">
              <ComponentLectura/>
              <ComponentJuego idUsuario={null} />
            </div>
          </div>
          <div className='footer'>
              <ComponentFooter />
          </div>
          </div>: <Navigate to="/login"/> }
        />

        {/** Boton que te permite publicar un mensaje sobre un juego */}
        <Route
        path='/publicacion'
        element={isAuthenticated ?         
         <div className="pagina-contenedor">
            <div className="menu-fijo">
              <ComponentMenu />
            </div>  
          <div className="contenido-principal-publicar">          
            <ComponentPublicar/>             
          </div>         
          <div className='footer'>
              <ComponentFooter />
          </div>          
          </div> : <Navigate to="/login"/>}
        />

        <Route
        path='/Responder'
        element={isAuthenticated ? <div className="pagina-contenedor">
            <div className="menu-fijo">
              <ComponentMenu />
            </div>          
            <div className="contenido-principal">
              <ComponentResponder/>
            </div>             
            <div className='footer'>
              <ComponentFooter />
            </div>  
          </div> : <Navigate to="/login"/>}
        />  


        <Route
        path="/EleccionJuego"
        element={isAuthenticated ? <div className="pagina-contenedor">
            <div className="menu-fijo">
              <ComponentMenu />
            </div>
          <div className="contenido-principal-busqueda">
          <BusquedaSeleccionCompoenet /> 
          </div>   
          <div className='footer'>
              <ComponentFooter />
          </div>  </div>: <Navigate to="/login"/>}
        />


        <Route
        path="/Perfil"
        element={isAuthenticated ? <div className="pagina-contenedor">
            <div className="menu-fijo">
              <ComponentMenu />
            </div>          
            <div className="contenido-principal-perfil">
              <ComponentPerfil />  
            </div>           
          <div className='footer'>
              <ComponentFooter />
          </div>
          </div>: <Navigate to="/login"/>}
        />
        
        
        {/**Esta ruta te lleva a detalles del juego */}
        <Route
        path="/DetalleJuego"
        element={isAuthenticated ? <div className="pagina-contenedor">        
          <div className="menu-fijo">
            <ComponentMenu />
          </div>          
          <div className="contenido-principal-detalleJuego">

          <ComponentJuegoDetallado />          
          </div>          

          <div className='footer'>
              <ComponentFooter />
          </div>   
           </div>: <Navigate to="/login"/>}
        />



          <Route
        path="/CrearJuego"
        element={isAuthenticated ? <div className="pagina-contenedor">         
          <div className="menu-fijo">
           <ComponentMenu />
          </div>           
          <div className="contenido-principal-detalleJuego"> {/**Revisar como ha quedado  */}
            <ComponentCrearJuego />  
          </div>          
          <div className='footer'>
              <ComponentFooter />
          </div>
          </div>: <Navigate to="/login"/>}
        />


        <Route
        path="/BusquedaJuego"
        element={isAuthenticated ? <div className="pagina-contenedor">        
          <div className="menu-fijo">
            <ComponentMenu />
          </div>      
          <div className="contenido-principal-perfil">
             <CompoenetBusqueda/>
            </div>          
             
          <div className='footer'>
              <ComponentFooter />
          </div>             
             </div>: <Navigate to="/login"/>}
        />

        <Route
        path="/BusquedaUsuario"
        element={isAuthenticated ? <div className="pagina-contenedor"> 
          <div className="menu-fijo">
            <ComponentMenu />
          </div>        
          <div className="contenido-principal-perfil">
           <ComponentMostrarUsuario/>             
          </div>
          <div className='footer'>
              <ComponentFooter />
          </div>          
          </div>: <Navigate to="/login"/>}
        />



      </Routes>
    </Router>
  );
}


export default App;