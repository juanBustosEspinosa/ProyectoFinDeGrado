package org.example.poryectofinal.MundoVideojuegos.Servicio;

import org.example.poryectofinal.MundoVideojuegos.Modulo.LikesDislike;
import org.example.poryectofinal.MundoVideojuegos.Modulo.Mensaje;
import org.example.poryectofinal.MundoVideojuegos.Modulo.Usuario;
import org.example.poryectofinal.MundoVideojuegos.Repositorio.RepositorioLikesDislike;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ServicioLikesDislike {
    @Autowired
    private RepositorioLikesDislike repositorioLikesDislike;
    @Transactional
    public List<LikesDislike> getAll(){
        return repositorioLikesDislike.findAll();
    }
    @Transactional
    public LikesDislike getById(Integer id){
        if (repositorioLikesDislike.existsById(id)) {
            return repositorioLikesDislike.getLikesDislikeById((id));
        }
        return null;
    }
    @Transactional
    public List<LikesDislike> getALLByRespuesta(Integer idMensajeRespuesta){
        return repositorioLikesDislike.findByIdMensajeRespuesta_Id(idMensajeRespuesta);
    }

    @Transactional
    public String save(LikesDislike likesDislike){
        if (repositorioLikesDislike.existsByid(likesDislike.getId())){
            return "El nombre del Mensaje ya existe";
        }else {
            repositorioLikesDislike.save(likesDislike);
            return "Se ha creado el Mensaje";
        }

    }



    @Transactional
    public List<LikesDislike> getLikesDisLikesUsuario (Integer usuario){
        return repositorioLikesDislike.findByIdUsuario_Id(usuario);
    }

    @Transactional
    public String update(LikesDislike likesDislike) throws Exception {

        LikesDislike existe = repositorioLikesDislike.getLikesDislikeByIdUsuario_IdAndIdMensaje_Id(likesDislike.getIdUsuario().getId(),
                likesDislike.getIdMensaje().getId());
        if (existe != null) {
            existe.setTipo(likesDislike.getTipo());
            repositorioLikesDislike.save(existe);
            return "Se a actualizado like o dislike";
        } else {
            repositorioLikesDislike.save(likesDislike);
            return "Se ha creado like o dislike";
        }


    }

    public String updateR(LikesDislike likesDislike) {
        LikesDislike existe = repositorioLikesDislike.getLikesDislikeByIdUsuario_IdAndIdMensajeRespuesta_Id(
                likesDislike.getIdUsuario().getId(),
                likesDislike.getIdMensajeRespuesta().getId()
        );
        if (existe != null) {
            existe.setTipo(likesDislike.getTipo());
            repositorioLikesDislike.save(existe);
            return "Se a actualizado like o dislike";

        } else {
            repositorioLikesDislike.save(likesDislike);
            return "Se ha creado like o dislike";
        }
    }



    @Transactional
    public String deleteMensaje(Integer id_Usuario,Integer id_Mensaje){
        LikesDislike likesDislike = repositorioLikesDislike.getLikesDislikeByIdUsuario_IdAndIdMensaje_Id(id_Usuario,id_Mensaje);
        if (likesDislike == null) {
            return "El mensaje o el usuario no existe";
        }

        repositorioLikesDislike.deleteById(likesDislike.getId());
        return "Se ha eliminado el LikeDislike";
    }



    @Transactional
    public String deleteMensajeRespuesta(Integer id_Usuario,Integer id_MensajeRespuesta){
        LikesDislike likesDislike = repositorioLikesDislike.getLikesDislikeByIdUsuario_IdAndIdMensajeRespuesta_Id(id_Usuario,id_MensajeRespuesta);
        if (likesDislike == null) {
            return "El mensaje o el usuario no existe";
        }

        repositorioLikesDislike.deleteById(likesDislike.getId());
        return "Se ha eliminado el LikeDislike";
    }


    public String deleteALLMensajes(Integer idMensaje){
        List<LikesDislike> likesDislikes= repositorioLikesDislike.findByIdMensaje_Id(idMensaje);
        if (!likesDislikes.isEmpty()) {
            repositorioLikesDislike.deleteAll(likesDislikes);
            return "Se ha eliminado el LikeDislike de todos";
        }else {
            return "No hay likes ni dislikes";
        }
    }

    public String deleteALLRespuestas(Integer idMensajeRespuesta){
        List<LikesDislike> likesDislikes= repositorioLikesDislike.findByIdMensajeRespuesta_Id((idMensajeRespuesta));
        if (!likesDislikes.isEmpty()) {
            repositorioLikesDislike.deleteAll(likesDislikes);
            return "Se ha eliminado el LikeDislike de todos";
        }else {
            return "No hay likes ni dislikes";
        }
    }
}
