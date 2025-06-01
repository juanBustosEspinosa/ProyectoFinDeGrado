package org.example.poryectofinal.MundoVideojuegos.Repositorio;

import org.example.poryectofinal.MundoVideojuegos.Modulo.Juego;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RepositorioJuego extends JpaRepository<Juego,Integer> {
    Juego getJuegoById(Integer id);

    boolean existsByNombre(String nombre);
    @Query("SELECT j FROM Juego j WHERE LOWER(j.nombre) LIKE LOWER(CONCAT('%', :nombre, '%'))")
    List<Juego> buscarPorNombre(String nombre);

    List<Juego> findByIdDesarrollador_Id(Integer idDesarrolladorId);
    @Query("SELECT j FROM Juego j WHERE FUNCTION('MONTH', j.fechaLanzamiento) = :mes AND FUNCTION('YEAR', j.fechaLanzamiento) = :anio")
    List<Juego> buscarJuegosDelMes(@Param("mes") int mes, @Param("anio") int anio);
}
