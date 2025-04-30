package org.example.poryectofinal.MundoVideojuegos.Controlador;

import jakarta.validation.Valid;
import org.example.poryectofinal.MundoVideojuegos.Modulo.Juego;
import org.example.poryectofinal.MundoVideojuegos.Servicio.ServicioJuego;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/Juego")
public class ControladorJuego {
    @Autowired
    private ServicioJuego servicioJuego;

    @GetMapping
    public ResponseEntity<List<Juego>> getAll(){
        return ResponseEntity.ok(servicioJuego.getAll());
    }
    @GetMapping("{id}")
    public ResponseEntity<Juego> getById(@PathVariable int id){
        return ResponseEntity.ok(servicioJuego.getById(id));
    }


    @GetMapping("/BuscarJuegos")
    public ResponseEntity<List<Juego>> buscarJuegos(@RequestParam String nombre){
        return ResponseEntity.ok(servicioJuego.like(nombre));
    }

    @PostMapping
    public ResponseEntity<String> add(@Valid @RequestBody Juego juego){
        return ResponseEntity.ok(servicioJuego.save(juego));
    }

    @PutMapping
    public ResponseEntity<String> update(@Valid @RequestBody Juego juego){
        return ResponseEntity.ok(servicioJuego.update(juego));
    }
    @PutMapping("/{id}/imagen")
    public ResponseEntity<String> updateImage(@PathVariable Integer id, @RequestParam("file") MultipartFile file) throws IOException {
        return ResponseEntity.ok(servicioJuego.updateImagen(id,file));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> delete(@PathVariable int id){
        return ResponseEntity.ok(servicioJuego.delete(id));
    }
}
