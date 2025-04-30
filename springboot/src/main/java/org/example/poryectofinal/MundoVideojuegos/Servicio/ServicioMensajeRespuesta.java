package org.example.poryectofinal.MundoVideojuegos.Servicio;

import org.example.poryectofinal.MundoVideojuegos.Modulo.Juego;
import org.example.poryectofinal.MundoVideojuegos.Modulo.MensajeRespuesta;
import org.example.poryectofinal.MundoVideojuegos.Repositorio.RepositorioMensajeRespuesta;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
@Service
public class ServicioMensajeRespuesta {
    @Autowired
    private RepositorioMensajeRespuesta repositorioMensajeRespuesta;

    @Transactional
    public List<MensajeRespuesta> getAll(){
        return repositorioMensajeRespuesta.findAll();
    }
    @Transactional
    public MensajeRespuesta getById(Integer id){
        if (repositorioMensajeRespuesta.existsById(id)) {
            return repositorioMensajeRespuesta.getMensajeRespuestaById(id);
        }
        return null;
    }
    @Transactional
    public String save(MensajeRespuesta mensajeRespuesta){
        if (mensajeRespuesta.getId() != null && repositorioMensajeRespuesta.existsById(mensajeRespuesta.getId())) {
            return "Ya existe la respuesta";
        } else {
            repositorioMensajeRespuesta.save(mensajeRespuesta);
            return "Se ha creado la respuesta";
        }

    }

    @Transactional
    public List<MensajeRespuesta> getIdMensaje(Integer idMensaje){
        return repositorioMensajeRespuesta.findByIdMensaje_Id(idMensaje);
    }

    @Transactional
    public String update(MensajeRespuesta mensajeRespuesta){
        if (repositorioMensajeRespuesta.existsById(mensajeRespuesta.getId())){
            repositorioMensajeRespuesta.save(mensajeRespuesta);
            return "Se ha actualizado el usuario";
        }
        return "El usuario no existe";
    }

    @Transactional
    public String updateImagen(Integer id, MultipartFile file) throws IOException {
        if (repositorioMensajeRespuesta.existsById(id)) {
            MensajeRespuesta mensajeRespuesta = repositorioMensajeRespuesta.getMensajeRespuestaById(id);
            mensajeRespuesta.setImagen(file.getBytes());
            repositorioMensajeRespuesta.save(mensajeRespuesta);
            return "Se ha añadido la foto";
        }
        return "El juego no existe";
    }
    @Transactional
    public String delete(Integer id){
        repositorioMensajeRespuesta.deleteById(id);
        return "Se ha eliminado el usuario";
    }
}
