package org.example.poryectofinal.MundoVideojuegos.Repositorio;

import org.example.poryectofinal.MundoVideojuegos.Modulo.Mensaje;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RepositorioMensaje  extends JpaRepository<Mensaje,Integer> {
    boolean existsByid(Integer id);

    Mensaje getMensajeById(Integer id);

    List<Mensaje> getMensajeByIdJuego_Id(Integer id);

    List<Mensaje> getMensajeByIdUsuario_Id(Integer idUsuarioId);
    @Query("SELECT m FROM Mensaje m WHERE FUNCTION('MONTH', m.fecha) = :mes AND FUNCTION('YEAR', m.fecha) = :anio")
    List<Mensaje> buscarMensajesDelMes(@Param("mes") int mes, @Param("anio") int anio);
}
