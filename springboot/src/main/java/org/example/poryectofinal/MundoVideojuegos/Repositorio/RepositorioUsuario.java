package org.example.poryectofinal.MundoVideojuegos.Repositorio;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.example.poryectofinal.MundoVideojuegos.Modulo.Juego;
import org.example.poryectofinal.MundoVideojuegos.Modulo.Mensaje;
import org.example.poryectofinal.MundoVideojuegos.Modulo.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RepositorioUsuario extends JpaRepository<Usuario,Integer> {
    Usuario getUsuarioById(Integer id);

    boolean existsByNickname(String nickname);

    Usuario getUsuarioByNicknameAndContrasena(@Size(max = 255) @NotNull String nickname, @Size(max = 255) @NotNull String contrasena);

    Usuario getUsuarioByNickname(@Size(max = 255) @NotNull String nickname);

    @Query("SELECT u FROM Usuario u WHERE LOWER(u.nickname) LIKE LOWER(CONCAT('%', :nickname, '%'))")
    List<Usuario> buscarPorNickname(String nickname);
    @Query("SELECT u FROM Usuario u WHERE FUNCTION('MONTH', u.fechaInicio) = :mes AND FUNCTION('YEAR', u.fechaInicio) = :anio")
    List<Usuario> buscarUsuariosDelMes(@Param("mes") int mes, @Param("anio") int anio);
}

