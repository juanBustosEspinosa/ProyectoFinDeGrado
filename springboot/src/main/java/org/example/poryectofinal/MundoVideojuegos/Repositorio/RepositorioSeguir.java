package org.example.poryectofinal.MundoVideojuegos.Repositorio;

import org.example.poryectofinal.MundoVideojuegos.Modulo.Seguir;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositorioSeguir  extends JpaRepository<Seguir,Integer> {
    boolean existsByid(Integer id);

    Seguir getSeguirById(Integer id);
}
