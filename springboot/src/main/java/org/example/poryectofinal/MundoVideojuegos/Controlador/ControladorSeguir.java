package org.example.poryectofinal.MundoVideojuegos.Controlador;

import jakarta.validation.Valid;
import org.example.poryectofinal.MundoVideojuegos.Modulo.Seguir;
import org.example.poryectofinal.MundoVideojuegos.Servicio.ServicioSeguir;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Seguir")
public class ControladorSeguir {
    @Autowired
    private ServicioSeguir servicioSeguir;

    @GetMapping
    public ResponseEntity<List<Seguir>> getAll(){
        return ResponseEntity.ok(servicioSeguir.getAll());
    }
    @GetMapping("{id}")
    public ResponseEntity<Seguir> getById(@PathVariable int id){
        return ResponseEntity.ok(servicioSeguir.getById(id));
    }

    @PostMapping
    public ResponseEntity<String> add(@Valid @RequestBody Seguir seguir){
        return ResponseEntity.ok(servicioSeguir.save(seguir));
    }

    @PutMapping
    public ResponseEntity<String> update(@Valid @RequestBody Seguir seguir){
        return ResponseEntity.ok(servicioSeguir.update(seguir));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> delete(@PathVariable int id){
        return ResponseEntity.ok(servicioSeguir.delete(id));
    }
}
