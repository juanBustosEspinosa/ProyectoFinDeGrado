package org.example.poryectofinal.MundoVideojuegos.Repositorio;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.example.poryectofinal.MundoVideojuegos.Modulo.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositorioUsuario extends JpaRepository<Usuario,Integer> {
    Usuario getUsuarioById(Integer id);

    boolean existsByNickname(String nickname);

    Usuario getUsuarioByNicknameAndContrasena(@Size(max = 255) @NotNull String nickname, @Size(max = 255) @NotNull String contrasena);

    Usuario getUsuarioByNickname(@Size(max = 255) @NotNull String nickname);
}
