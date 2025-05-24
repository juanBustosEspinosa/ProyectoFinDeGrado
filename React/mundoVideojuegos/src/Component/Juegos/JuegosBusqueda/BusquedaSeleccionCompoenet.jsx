import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../ListaJuegos.css'

function BusquedaSeleccionCompoenet() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const nombre = queryParams.get('nombre') || null; // Aquí obtienes el nombre del juego
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const empresa = location.state?.empresa || false; // por defecto false si no llega

  const [juegos, setJuegos] = useState([]);
  const navigate = useNavigate();



    const [paginaActual, setPaginaActual] = useState(1);
    const juegosPorPagina = 10;
  
    const totalPaginas = Math.ceil(juegos.length / juegosPorPagina);
  
    const indiceInicio = (paginaActual - 1) * juegosPorPagina;

    const juegosAMostrar = juegos.slice(indiceInicio, indiceInicio + juegosPorPagina);



  // Hacer la búsqueda de juegos cuando cambia el nombre
  useEffect(() => {
    const obtenerJuegos = async () => {
      try {

      let resposive;
        if (!empresa){
         resposive= await axios.get('http://localhost:8091/Juego/BuscarJuegos', {
          params: { nombre: nombre }
        }); 
        }else if (empresa) {
          resposive = await axios.get('http://localhost:8091/Juego/BuscarJuegosUsuario',
            {params: {id: usuario.id}}
          )
        }
        
        setJuegos(resposive.data);
      } catch (error) {
        console.error(error);
      }
    };

    
      obtenerJuegos();
    
  }, [nombre]);

  // Manejar la selección de un juego
  const handleSeleccionarJuego = (juego) => {
    // Pasar el objeto completo del juego como estado al navegar
    if (!empresa){
    navigate('/publicacion', { state: { juego: juego } });
    } else if (empresa) {
      navigate('/PublicarMensajeInformatico', { state: { juego: juego } });

    }
  };

  const handleVolver = () => {
        if (!empresa){
    navigate('/publicacion');
    } else if (empresa) {
      navigate('/PublicarMensajeInformatico');

    }
  }

  return (
      <div className="lista-juegos-container">
        <h1>Buscando juegos relacionados con: {nombre}</h1>
      <div className="lista-juegos">
        {juegosAMostrar.map((juego) => (
          <div key={juego.id} className="juego-card">
          <img src={`data:image/jpeg;base64,${juego.imagen}`} alt={`Portada de ${juego.nombre}`} />
          <div>
            <h2>{juego.nombre}</h2>
            <p><strong>Desarrollador:</strong> {juego.idDesarrollador.nickname}</p>
            <p><strong>Fecha de lanzamiento:</strong> {juego.fechaLanzamiento}</p>
            <p><strong>Género 1:</strong> {juego.genero1}</p>
            {juego.genero2 && <p><strong>Género 2:</strong> {juego.genero2}</p>}
            <p><strong>Tipo:</strong> {juego.tipo}</p>
            <button onClick={() => handleSeleccionarJuego(juego)}>Elegir juego</button>
            </div>
        </div>
        ))}
      </div>
      <div className="paginacion">
        {Array.from({ length: totalPaginas }, (_, i) => (
          <button
            key={i}
            className={paginaActual === i + 1 ? 'activa' : ''}
            onClick={() => setPaginaActual(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button className='' onClick={handleVolver}>volver</button>
      </div>
    </div>
  );
}

export default BusquedaSeleccionCompoenet;
