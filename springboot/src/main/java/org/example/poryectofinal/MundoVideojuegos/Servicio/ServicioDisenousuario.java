package org.example.poryectofinal.MundoVideojuegos.Servicio;

import org.example.poryectofinal.MundoVideojuegos.Modulo.Disenousuario;
import org.example.poryectofinal.MundoVideojuegos.Modulo.Juego;
import org.example.poryectofinal.MundoVideojuegos.Repositorio.RepositorioDisenousuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class ServicioDisenousuario {
    @Autowired
    private RepositorioDisenousuario repositorioDisenousuario;

    @Transactional
    public List<Disenousuario> getAll(){
        return repositorioDisenousuario.findAll();
    }
    @Transactional
    public Disenousuario getById(Integer id){
        if (repositorioDisenousuario.existsById(id)) {
            return repositorioDisenousuario.getDisenousuarioById((id));
        }
        return null;
    }
    @Transactional
    public String save(Disenousuario disenousuario){
        if (repositorioDisenousuario.existsByid(disenousuario.getId())){
            return "El nombre del Mensaje ya existe";
        }else {
            repositorioDisenousuario.save(disenousuario);
            return "Se ha creado el Mensaje";
        }

    }
    @Transactional
    public String update(Disenousuario disenousuario){
        if (repositorioDisenousuario.existsByid((disenousuario.getId()))) {
            repositorioDisenousuario.save(disenousuario);
            return "Se ha actualizado el mensaje";
        }
        return "El mensaje no existe";

    }
    @Transactional
    public String updateImagen(Integer id, MultipartFile file) throws IOException {
        if (repositorioDisenousuario.existsById(id)) {
            Disenousuario disenousuario = repositorioDisenousuario.getDisenousuarioById(id);
            disenousuario.setImagen(file.getBytes());
            repositorioDisenousuario.save(disenousuario);
            return "Se ha añadido la foto";
        }
        return "El juego no existe";
    }

    @Transactional
    public String delete(Integer id){
        repositorioDisenousuario.deleteById(id);
        return "Se ha eliminado el Mensaje";
    }
}
