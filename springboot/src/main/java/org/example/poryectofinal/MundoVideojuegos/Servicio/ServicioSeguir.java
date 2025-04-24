package org.example.poryectofinal.MundoVideojuegos.Servicio;

import org.example.poryectofinal.MundoVideojuegos.Modulo.Seguir;
import org.example.poryectofinal.MundoVideojuegos.Repositorio.RepositorioSeguir;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ServicioSeguir {
    @Autowired
    private RepositorioSeguir repositorioSeguir;

    @Transactional
    public List<Seguir> getAll(){
        return repositorioSeguir.findAll();
    }
    @Transactional
    public Seguir getById(Integer id){
        if (repositorioSeguir.existsById(id)) {
            return repositorioSeguir.getSeguirById(id);
        }
        return null;
    }
    @Transactional
    public String save(Seguir seguir){
        if (repositorioSeguir.existsByid(seguir.getId())){
            return "El nombre del Mensaje ya existe";
        }else {
            repositorioSeguir.save(seguir);
            return "Se ha creado el Mensaje";
        }

    }
    @Transactional
    public String update(Seguir seguir){
        if (repositorioSeguir.existsByid((seguir.getId()))) {
            repositorioSeguir.save(seguir);
            return "Se ha actualizado el mensaje";
        }
        return "El mensaje no existe";

    }
    @Transactional
    public String delete(Integer id){
        repositorioSeguir.deleteById(id);
        return "Se ha eliminado el Mensaje";
    }
}
