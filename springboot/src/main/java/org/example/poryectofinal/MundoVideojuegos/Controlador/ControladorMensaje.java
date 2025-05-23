package org.example.poryectofinal.MundoVideojuegos.Controlador;

import jakarta.validation.Valid;
import org.example.poryectofinal.MundoVideojuegos.Modulo.Mensaje;
import org.example.poryectofinal.MundoVideojuegos.Servicio.ServicioMensaje;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/Mensaje")
public class ControladorMensaje {
    @Autowired
    private ServicioMensaje servicioMensaje;

    @GetMapping
    public ResponseEntity<List<Mensaje>> getAll(){
        return ResponseEntity.ok(servicioMensaje.getAll());
    }
    @GetMapping("{id}")
    public ResponseEntity<Mensaje> getById(@PathVariable int id){
        return ResponseEntity.ok(servicioMensaje.getById(id));
    }

    @PostMapping
    public ResponseEntity<String> add(@Valid @RequestBody Mensaje mensaje){
        return ResponseEntity.ok(servicioMensaje.save(mensaje));
    }

    @PutMapping
    public ResponseEntity<String> update(@Valid @RequestBody Mensaje mensaje){
        return ResponseEntity.ok(servicioMensaje.update(mensaje));
    }
    @PutMapping("/{id}/imagen")
    public ResponseEntity<String> updateImage(@PathVariable Integer id, @RequestParam("file") MultipartFile file) throws IOException {
        return ResponseEntity.ok(servicioMensaje.updateImagen(id,file));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> delete(@PathVariable int id){
        return ResponseEntity.ok(servicioMensaje.delete(id));
    }

}
