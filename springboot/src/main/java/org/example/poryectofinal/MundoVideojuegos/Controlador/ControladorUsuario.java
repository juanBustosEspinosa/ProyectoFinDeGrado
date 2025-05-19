package org.example.poryectofinal.MundoVideojuegos.Controlador;

import jakarta.validation.Valid;
import org.example.poryectofinal.MundoVideojuegos.Modulo.Usuario;
import org.example.poryectofinal.MundoVideojuegos.Servicio.ServicioUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/Usuario")
public class ControladorUsuario {
    @Autowired
    private ServicioUsuario servicioUsuario;

    @GetMapping
    public ResponseEntity<List<Usuario>> getAll(){
        return ResponseEntity.ok(servicioUsuario.getAll());
    }
    @GetMapping("{id}")
    public ResponseEntity<Usuario> getById(@PathVariable int id){
        return ResponseEntity.ok(servicioUsuario.getById(id));
    }

    @GetMapping("/BuscaUsuario")
    public ResponseEntity<List<Usuario>> getByNickname(@RequestParam String nickname){
        return ResponseEntity.ok(servicioUsuario.buscarPorNickname(nickname));
    }

    @GetMapping("/login")
    public ResponseEntity<Usuario> getByNickname(@RequestParam String nickname,@RequestParam String password){
        return ResponseEntity.ok(servicioUsuario.inicioSesion(nickname,password));
    }

    @PostMapping
    public ResponseEntity<String> add(@Valid @RequestBody Usuario usuario){
        return ResponseEntity.ok(servicioUsuario.save(usuario));
    }

    @PutMapping
    public ResponseEntity<String> update(@Valid @RequestBody Usuario usuario){
        return ResponseEntity.ok(servicioUsuario.update(usuario));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> delete(@PathVariable int id){
        return ResponseEntity.ok(servicioUsuario.delete(id));
    }


}
