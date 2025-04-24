package org.example.poryectofinal.MundoVideojuegos.Repositorio;

import org.example.poryectofinal.MundoVideojuegos.Modulo.Juego;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositorioJuego extends JpaRepository<Juego,Integer> {
    Juego getJuegoById(Integer id);

    boolean existsByNombre(String nombre);
}
