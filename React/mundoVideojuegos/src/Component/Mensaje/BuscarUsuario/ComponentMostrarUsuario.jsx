import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import foto from "./../../../Fotos/foto.webp";
import "./ComponentMostrarUsuario.css";




function ComponentMostrarUsuario({mes}){
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const usuarioLocal = JSON.parse(localStorage.getItem("usuario"));
    const nickname = queryParams.get('nickname'); // Aquí obtienes el nickname del usuario
    const [usuarios, setUsuarios] = useState([]);
    const [paginaActual, setPaginaActual] = useState(1);
    const [suscripciones, setSuscripciones] = useState([]);
    const usuariosPorPagina = 10; //Aqui deberia de aumentarse pero por ahora es solo para probar
  
    const totalPaginas = Math.ceil(usuarios.length / usuariosPorPagina);
  
    const indiceInicio = (paginaActual - 1) * usuariosPorPagina;
    const usuariosAMostrar = usuarios.slice(indiceInicio, indiceInicio + usuariosPorPagina);


    useEffect(() => {
        const obtenerUsuarios = async () => {
          let resposive;
          try {
            if (!mes){
            resposive = await axios.get('http://localhost:8091/Usuario/BuscaUsuario', {
              params: { nickname: nickname }
            }); //Se busca el usuario comprobando de que mes este en false
            } else {
              resposive = await axios.get('http://localhost:8091/Usuario/UsuarioMes') // se busca los usuarios que se han registrado este mes
            }
            
            setUsuarios(resposive.data);
          } catch (error) {
            console.error(error);
          }
        };
    
        if (nickname || mes) {
          obtenerUsuarios();
        }
      }, [nickname]);
      const irAlPerfil = (usuario) => {
        navigate('/Perfil', { state: { usuario } });
      };


//En este useEffect cogemos todos los seguidos que tiene el usuario
useEffect(() => {
  const obtenerSuscripciones = async () => {
    try {
      const response = await axios.get('http://localhost:8091/Seguir', {
        params: { idUsuario: usuarioLocal.id }
      });

      // Accede correctamente a los usuarios seguidos 
      const datos = response.data; 
      
      // Extrae los IDs de los usuarios seguidos
      const idsSeguidos = datos.map(u => u.idSeguido.id); //aqui alomejor hay un fallo
      setSuscripciones(idsSeguidos);

    } catch (error) {
      console.error("Error al cargar suscripciones:", error);
    }
  };

  if (usuarioLocal?.id) {
    obtenerSuscripciones();
  }
}, [usuarioLocal?.id]);




      //handleSuscripcion lo que hace es seguir o deseguir a el usuario que ha puesto el mensaje
  const handleSuscripcion = async (idSeguido) => {
  try {
    const yaSigue = suscripciones.includes(idSeguido);

    if (yaSigue) {
      const nueva = {
        idSeguidor: { id: usuarioLocal.id },  
        idSeguido: { id: idSeguido }     
      };

      await axios.delete("http://localhost:8091/Seguir", {
        headers: {
          'Content-Type': 'application/json'
        },
        data: nueva
      });

      // Actualizamos el estado de las suscripciones
      setSuscripciones(prev => prev.filter(id => id !== idSeguido));
    } else {
      const nueva = {
        idSeguidor: { id: usuarioLocal.id },   
        idSeguido: { id: idSeguido }     
      };
      await axios.post('http://localhost:8091/Seguir', nueva, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Actualizamos el estado de las suscripciones
      setSuscripciones(prev => [...prev, idSeguido]);
    }
  } catch (error) {
    console.error("Error al (des)seguir usuario:", error);
  }
};
      

      console.log(usuarios);

      return (
        <div>
        <div className="usuarios-container">
          {usuariosAMostrar.map((usuario, index) => (
            <div className="usuario-card" key={index}>
              <img
                className="perfil-usuario"
                src={usuario.imagen ? `data:image/jpeg;base64,${usuario.imagen}` : foto}
                alt="perfil"
              />
              <div className="usuario-info">
                <p className="usuario-nickname"><a onClick={() => irAlPerfil(usuario)} > 
                  {usuario.nickname}
                </a></p>
              <p className="usuario-fecha">{usuario.fechaInicio}</p>


               {usuarioLocal.id !== usuario.id && (
                <button
                className={`btn-suscribirse ${suscripciones.includes(usuario.id) ? 'siguiendo' : ''}`}
                onClick={() => handleSuscripcion(usuario.id)}
                >
                  {suscripciones.includes(usuario.id) ? 'Siguiendo' : 'Seguir'}   
                </button>
            )}

            </div>
        </div>
        ))}

        {/** PAGINACION */}
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
      )




}

export default ComponentMostrarUsuario;