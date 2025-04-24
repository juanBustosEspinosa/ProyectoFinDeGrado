package org.example.poryectofinal.MundoVideojuegos.Repositorio;

import org.example.poryectofinal.MundoVideojuegos.Modulo.Disenousuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositorioDisenousuario  extends JpaRepository<Disenousuario,Integer> {
    Disenousuario getDisenousuarioById(Integer id);

    boolean existsByid(Integer id);
}
