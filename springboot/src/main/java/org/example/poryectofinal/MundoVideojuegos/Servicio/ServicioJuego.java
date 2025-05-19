package org.example.poryectofinal.MundoVideojuegos.Servicio;

import org.example.poryectofinal.MundoVideojuegos.Excepciones.NoHayJuegosException;
import org.example.poryectofinal.MundoVideojuegos.Modulo.Juego;
import org.example.poryectofinal.MundoVideojuegos.Repositorio.RepositorioJuego;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
@Service
public class ServicioJuego {
    @Autowired
    private RepositorioJuego repositorioJuego;

    @Transactional
    public List<Juego> getAll(){
        return repositorioJuego.findAll();
    }
    @Transactional
    public Juego getById(Integer id){
        if (repositorioJuego.existsById(id)) {
            return repositorioJuego.getJuegoById(id);
        }
        return null;
    }
    @Transactional
    public String save(Juego juego){
        if (repositorioJuego.existsByNombre((juego.getNombre()))){
            return "El nombre del usuario ya existe";
        }else {
            repositorioJuego.save(juego);
            return "Se ha creado el usuario";
        }

    }
    @Transactional
    public String update(Juego juego){
        if (repositorioJuego.existsByNombre(juego.getNombre())) {
            repositorioJuego.save(juego);
            return "Se ha actualizado el usuario";
        }
        return "El usuario no existe";

    }

    @Transactional
    public String updateImagen(Integer id, MultipartFile file) throws IOException {
        if (repositorioJuego.existsById(id)) {
            Juego juego = repositorioJuego.getJuegoById(id);
            juego.setImagen(file.getBytes());
            repositorioJuego.save(juego);
            return "Se ha añadido la foto";
        }
        return "El juego no existe";
    }

    @Transactional
    public List<Juego> like(String nombre){
        List<Juego> listaJuegos = repositorioJuego.buscarPorNombre(nombre);
        if (listaJuegos.isEmpty()){
            throw new NoHayJuegosException("No se ha encontrado nada con " + nombre);
        }
        return listaJuegos;
    }

    public List<Juego> getJuegoByUsuario(Integer id){
        List<Juego> listaJuegos = repositorioJuego.findByIdDesarrollador_Id(id);
        if (listaJuegos.isEmpty()){
            throw new NoHayJuegosException("No hay juegos publicados");
        }
        return listaJuegos;
    }


    @Transactional
    public String delete(Integer id){
        repositorioJuego.deleteById(id);
        return "Se ha eliminado el juego";
    }
}
