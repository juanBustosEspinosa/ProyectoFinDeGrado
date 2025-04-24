package org.example.poryectofinal.MundoVideojuegos.Controlador;

import jakarta.validation.Valid;
import org.example.poryectofinal.MundoVideojuegos.Modulo.Disenousuario;
import org.example.poryectofinal.MundoVideojuegos.Servicio.ServicioDisenousuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/Disenousuario")
public class ControladorDisenousuario {
    @Autowired
    private ServicioDisenousuario servicioDisenousuario;

    @GetMapping
    public ResponseEntity<List<Disenousuario>> getAll(){
        return ResponseEntity.ok(servicioDisenousuario.getAll());
    }
    @GetMapping("{id}")
    public ResponseEntity<Disenousuario> getById(@PathVariable int id){
        return ResponseEntity.ok(servicioDisenousuario.getById(id));
    }

    @PostMapping
    public ResponseEntity<String> add(@Valid @RequestBody Disenousuario disenousuario){
        return ResponseEntity.ok(servicioDisenousuario.save(disenousuario));
    }

    @PutMapping
    public ResponseEntity<String> update(@Valid @RequestBody Disenousuario disenousuario){
        return ResponseEntity.ok(servicioDisenousuario.update(disenousuario));
    }
    @PutMapping("/{id}/imagen")
    public ResponseEntity<String> updateImage(@PathVariable Integer id, @RequestParam("file") MultipartFile file) throws IOException {
        return ResponseEntity.ok(servicioDisenousuario.updateImagen(id, file));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> delete(@PathVariable int id){
        return ResponseEntity.ok(servicioDisenousuario.delete(id));
    }
}
