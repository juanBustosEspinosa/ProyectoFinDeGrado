import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import foto from "./../../../Fotos/foto.webp";
import "./ComponentMostrarUsuario.css";




function ComponentMostrarUsuario({mes}){
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const nickname = queryParams.get('nickname'); // Aquí obtienes el nickname del usuario
    const [usuarios, setUsuarios] = useState([]);
    const [paginaActual, setPaginaActual] = useState(1);
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
            }); 
            } else {
              resposive = await axios.get('http://localhost:8091/Usuario/UsuarioMes')
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
                <p className="usuario-nickname"><a onClick={() => irAlPerfil(usuario)} > {/**Hay que poner un style para que se vea cada vez que pasa el raton */}
                  {usuario.nickname}
                </a></p>
              <p className="usuario-fecha">{usuario.fechaInicio}</p>
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
      )




}

export default ComponentMostrarUsuario;