package org.example.poryectofinal.MundoVideojuegos.Repositorio;

import org.example.poryectofinal.MundoVideojuegos.Modulo.Seguir;
import org.example.poryectofinal.MundoVideojuegos.Modulo.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositorioSeguir  extends JpaRepository<Seguir,Integer> {
    boolean existsByid(Integer id);

    Seguir getSeguirById(Integer id);
    @Query("SELECT s FROM Seguir s WHERE s.idSeguidor.id = :idSeguidor AND s.idSeguido.id = :idSeguido")
    Seguir findByIds(@Param("idSeguidor") Integer idSeguidor, @Param("idSeguido") Integer idSeguido);

    Seguir getSeguirByIdSeguidorAndIdSeguido_Id(Usuario idSeguidor, Usuario idSeguido);

    Integer countByIdSeguidor_Id(Integer id);

    Integer countByIdSeguido_Id(Integer id);

    // Seguir getSeguirByIdSeguidorAndIdSeguido_Id(Integer id, Integer id1);
}
