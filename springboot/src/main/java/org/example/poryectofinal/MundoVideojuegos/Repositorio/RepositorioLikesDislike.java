package org.example.poryectofinal.MundoVideojuegos.Repositorio;

import org.example.poryectofinal.MundoVideojuegos.Modulo.LikesDislike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RepositorioLikesDislike  extends JpaRepository<LikesDislike,Integer> {
    boolean existsByid(Integer id);

    LikesDislike getLikesDislikeById(Integer id);

    LikesDislike getLikesDislikeByIdUsuario_IdAndIdMensaje_Id(Integer idUsuario, Integer idMensaje);

    List<LikesDislike> findByIdUsuario_Id(Integer idUsuario);

    LikesDislike getLikesDislikeByIdUsuario_IdAndIdMensajeRespuesta_Id(Integer idUsuarioId, Integer idMensajeRespuestaId);

    List<LikesDislike> findByIdMensaje_Id(Integer idMensajeId);

    List<LikesDislike> findByIdMensajeRespuesta_Id(Integer idMensajeRespuestaId);
}
