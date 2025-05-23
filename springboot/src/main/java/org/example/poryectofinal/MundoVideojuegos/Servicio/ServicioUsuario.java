package org.example.poryectofinal.MundoVideojuegos.Servicio;

import org.example.poryectofinal.MundoVideojuegos.Excepciones.UsuarioNoEncontradoException;
import org.example.poryectofinal.MundoVideojuegos.Modulo.Mensaje;
import org.example.poryectofinal.MundoVideojuegos.Modulo.Usuario;
import org.example.poryectofinal.MundoVideojuegos.Repositorio.RepositorioUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class ServicioUsuario {
    @Autowired
    private RepositorioUsuario repositorioUsuario;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public List<Usuario> getAll(){
        return repositorioUsuario.findAll();
    }
    @Transactional
    public Usuario getById(Integer id){
        if (repositorioUsuario.existsById(id)) {
            return repositorioUsuario.getUsuarioById(id);
        }
        return null;
    }
    public List<Usuario> getUsuarioDelMes(){
        LocalDate ahora = LocalDate.now();
        int mesActual = ahora.getMonthValue();
        int anioActual = ahora.getYear();

        return repositorioUsuario.buscarUsuariosDelMes(mesActual, anioActual);
    }



    @Transactional
    public Usuario inicioSesion(String nickname, String password) {
        Usuario usuario = repositorioUsuario.getUsuarioByNickname(nickname);
        if (usuario == null) {
            throw new UsuarioNoEncontradoException("El usuario con nickname " + nickname + " no fue encontrado.");
        }

        if (!passwordEncoder.matches(password, usuario.getContrasena())) {
            throw new IllegalArgumentException("Contraseña incorrecta.");
        }

        return usuario;
    }
    @Transactional
    public String save(Usuario usuario){

        if (repositorioUsuario.existsByNickname(usuario.getNickname())){
            throw new IllegalArgumentException ("El nombre del usuario ya existe");
        } else if (repositorioUsuario.existsByCorreo(usuario.getCorreo())) {
            throw new IllegalArgumentException ("El correo ya existe");
        } else if (repositorioUsuario.existsByTelefono(usuario.getTelefono())) {
            throw new IllegalArgumentException ("El telefono ya existe");
        } else {
            String passwordHash = passwordEncoder.encode(usuario.getContrasena());
            usuario.setContrasena(passwordHash);
            repositorioUsuario.save(usuario);
            return "Se ha creado el usuario";
        }

    }
    @Transactional
    public String update(Usuario usuario){
        if (repositorioUsuario.existsByNickname(usuario.getNickname())) {
            repositorioUsuario.save(usuario);
            return "Se ha actualizado el usuario";
        }
        return "El usuario no existe";

    }

    @Transactional
    public List<Usuario> buscarPorNickname(String nickname){
        return repositorioUsuario.buscarPorNickname(nickname);
    }
    @Transactional
    public String delete(Integer id){
        repositorioUsuario.deleteById(id);
        return "Se ha eliminado el usuario";
    }
}
