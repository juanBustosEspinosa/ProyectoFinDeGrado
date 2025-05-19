import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ListaJuegos.css';

function ListaJuegos({ juegos }) {
  const navigate = useNavigate();
  const [paginaActual, setPaginaActual] = useState(1);
  const juegosPorPagina = 10;

  const totalPaginas = Math.ceil(juegos.length / juegosPorPagina);

  const indiceInicio = (paginaActual - 1) * juegosPorPagina;
  const juegosAMostrar = juegos.slice(indiceInicio, indiceInicio + juegosPorPagina);

  return (
    <div className="lista-juegos-container">
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
              <button onClick={() => navigate('/DetalleJuego', { state: { juego } })}>
              Ver más detalles
              </button>
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
      </div>
    </div>
  );
}

export default ListaJuegos;