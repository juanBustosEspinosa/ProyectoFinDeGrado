package org.example.poryectofinal.MundoVideojuegos.Repositorio;

import org.example.poryectofinal.MundoVideojuegos.Modulo.Mensaje;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositorioMensaje  extends JpaRepository<Mensaje,Integer> {
    boolean existsByid(Integer id);

    Mensaje getMensajeById(Integer id);
}
