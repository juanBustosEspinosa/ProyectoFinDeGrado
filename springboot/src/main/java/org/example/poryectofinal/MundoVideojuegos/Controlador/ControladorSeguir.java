package org.example.poryectofinal.MundoVideojuegos.Controlador;

import jakarta.validation.Valid;
import org.example.poryectofinal.MundoVideojuegos.Modulo.Seguir;
import org.example.poryectofinal.MundoVideojuegos.Servicio.ServicioSeguir;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
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
    @GetMapping("/seguidor")
    public ResponseEntity<Integer> getSeguidor(@RequestParam Integer idSeguidor){
        return ResponseEntity.ok(servicioSeguir.countSeguidor(idSeguidor));
    }
    @GetMapping("/seguido")
    public ResponseEntity<Integer> getSeguido(@RequestParam Integer idSeguido){
        return ResponseEntity.ok(servicioSeguir.countSeguido(idSeguido));
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
    @DeleteMapping
    public ResponseEntity<String> deleteSeguir(@RequestBody Seguir seguir){
        return ResponseEntity.ok(servicioSeguir.deleteSeguir(seguir));
    }
}
