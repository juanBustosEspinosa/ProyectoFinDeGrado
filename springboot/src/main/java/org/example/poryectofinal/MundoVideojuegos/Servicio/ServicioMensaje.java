package org.example.poryectofinal.MundoVideojuegos.Servicio;

import org.example.poryectofinal.MundoVideojuegos.Modulo.Juego;
import org.example.poryectofinal.MundoVideojuegos.Modulo.Mensaje;
import org.example.poryectofinal.MundoVideojuegos.Repositorio.RepositorioMensaje;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@Service
public class ServicioMensaje {
    @Autowired
    private RepositorioMensaje repositorioMensaje;

    @Transactional
    public List<Mensaje> getAll(){
        return repositorioMensaje.findAll();
    }
    @Transactional
    public Mensaje getById(Integer id){
        if (repositorioMensaje.existsById(id)) {
            return repositorioMensaje.getMensajeById(id);
        }
        return null;
    }

    @Transactional
    public  List<Mensaje> getAllByJuegoId(Integer id){
        return repositorioMensaje.getMensajeByIdJuego_Id(id);
    }

    public  List<Mensaje> getAllByUsuarioId(Integer id){
        return repositorioMensaje.getMensajeByIdUsuario_Id((id));
    }

    public List<Mensaje> getMensajesDelMes(){
        LocalDate ahora = LocalDate.now();
        int mesActual = ahora.getMonthValue();
        int anioActual = ahora.getYear();

        return repositorioMensaje.buscarMensajesDelMes(mesActual, anioActual);
    }

    @Transactional
    public String save(Mensaje mensaje){
        if (repositorioMensaje.existsByid(mensaje.getId())){
            return "El nombre del Mensaje ya existe";
        }else {
            repositorioMensaje.save(mensaje);
            return "Se ha creado el Mensaje";
        }

    }
    @Transactional
    public String update(Mensaje mensaje){
        if (repositorioMensaje.existsByid((mensaje.getId()))) {
            repositorioMensaje.save(mensaje);
            return "Se ha actualizado el mensaje";
        }
        return "El mensaje no existe";

    }
    @Transactional
    public String updateImagen(Integer id, MultipartFile file) throws IOException {
        if (repositorioMensaje.existsById(id)) {
            Mensaje mensaje = repositorioMensaje.getMensajeById(id);
            mensaje.setImagen(file.getBytes());
            repositorioMensaje.save(mensaje);
            return "Se ha añadido la foto";
        }
        return "El juego no existe";
    }
    @Transactional
    public String delete(Integer id){
        repositorioMensaje.deleteById(id);
        return "Se ha eliminado el Mensaje";
    }
}
