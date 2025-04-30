package org.example.poryectofinal.MundoVideojuegos.Controlador;

import jakarta.validation.Valid;
import org.example.poryectofinal.MundoVideojuegos.Modulo.MensajeRespuesta;
import org.example.poryectofinal.MundoVideojuegos.Servicio.ServicioMensajeRespuesta;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/MensajeRespuesta")
public class ControladorMensajeRespuesta {
    @Autowired
    private ServicioMensajeRespuesta servicioMensajeRespuesta;

    @GetMapping
    public ResponseEntity<List<MensajeRespuesta>> getAll(){
        return ResponseEntity.ok(servicioMensajeRespuesta.getAll());
    }
    @GetMapping("{id}")
    public ResponseEntity<MensajeRespuesta> getById(@PathVariable int id){
        return ResponseEntity.ok(servicioMensajeRespuesta.getById(id));
    }

    @GetMapping("/ListaRespuesta")
    public ResponseEntity<List<MensajeRespuesta>> getListaRespuesta(@RequestParam("idMensaje") Integer id_Mensaje){
        return ResponseEntity.ok(servicioMensajeRespuesta.getIdMensaje(id_Mensaje));
    }

    @PostMapping
    public ResponseEntity<String> add(@RequestBody MensajeRespuesta mensajeRespuesta){
        return ResponseEntity.ok(servicioMensajeRespuesta.save(mensajeRespuesta));
    }

    @PutMapping
    public ResponseEntity<String> update(@Valid @RequestBody MensajeRespuesta mensajeRespuesta){
        return ResponseEntity.ok(servicioMensajeRespuesta.update(mensajeRespuesta));
    }
    @PutMapping("/{id}/imagen")
    public ResponseEntity<String> updateImage(@PathVariable Integer id, @RequestParam("file") MultipartFile file) throws IOException {
        return ResponseEntity.ok(servicioMensajeRespuesta.updateImagen(id,file));
    }
    @DeleteMapping("{id}")
    public ResponseEntity<String> delete(@PathVariable int id){
        return ResponseEntity.ok(servicioMensajeRespuesta.delete(id));
    }
}
