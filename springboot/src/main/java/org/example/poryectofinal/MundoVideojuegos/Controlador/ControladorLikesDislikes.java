package org.example.poryectofinal.MundoVideojuegos.Controlador;

import jakarta.validation.Valid;
import org.example.poryectofinal.MundoVideojuegos.Modulo.LikesDislike;
import org.example.poryectofinal.MundoVideojuegos.Modulo.Usuario;
import org.example.poryectofinal.MundoVideojuegos.Servicio.ServicioLikesDislike;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/LikesDislikes")
public class ControladorLikesDislikes {
    @Autowired
    private ServicioLikesDislike servicioLikesDislike;

    @GetMapping
    public ResponseEntity<List<LikesDislike>> getAll(){
        return ResponseEntity.ok(servicioLikesDislike.getAll());
    }
    @GetMapping("{id}")
    public ResponseEntity<LikesDislike> getById(@PathVariable int id){
        return ResponseEntity.ok(servicioLikesDislike.getById(id));
    }
    @GetMapping("/Respuestas")
    public ResponseEntity<List<LikesDislike>> getALLByRespuesta(@RequestParam Integer idMensajeRespuesta){
        return ResponseEntity.ok(servicioLikesDislike.getLikesDisLikesUsuario(idMensajeRespuesta));
    }

    @GetMapping("/Usuario")
    public ResponseEntity<List<LikesDislike>> getByUsuario(@RequestParam("idUsuario") Integer usuario){
        return ResponseEntity.ok(servicioLikesDislike.getLikesDisLikesUsuario(usuario));
    }

    @PostMapping
    public ResponseEntity<String> add(@Valid @RequestBody LikesDislike likesDislike){
        return ResponseEntity.ok(servicioLikesDislike.save(likesDislike));
    }

    @PutMapping
    public ResponseEntity<String> update(@Valid @RequestBody LikesDislike likesDislike) throws Exception {
        return ResponseEntity.ok(servicioLikesDislike.update(likesDislike));
    }
    @PutMapping("/Respuesta")
    public ResponseEntity<String> updateR(@Valid @RequestBody LikesDislike likesDislike) throws Exception {
        return ResponseEntity.ok(servicioLikesDislike.updateR(likesDislike));
    }


    @DeleteMapping("/eliminarMensaje")
    public ResponseEntity<String> deleteMensaje(@RequestParam int id_Usuario, @RequestParam int id_Mensaje) {
        return ResponseEntity.ok(servicioLikesDislike.deleteMensaje(id_Usuario,id_Mensaje));
    }
    @DeleteMapping("/eliminarRespuesta")
    public ResponseEntity<String> deleteMensajeRespuesta(@RequestParam int id_Usuario, @RequestParam int id_MensajeRespuesta) {
        return ResponseEntity.ok(servicioLikesDislike.deleteMensajeRespuesta(id_Usuario,id_MensajeRespuesta));
    }

    @DeleteMapping("/eliminarMensajeALL")
    public ResponseEntity<String> deleteMensaje(@RequestParam int idMensaje) {
        return ResponseEntity.ok(servicioLikesDislike.deleteALLMensajes(idMensaje));
    }

    @DeleteMapping("/eliminarRespuestaALL")
    public ResponseEntity<String> deleteALLMensajeRespuesta(@RequestParam int idMensajeRespuesta) {
        return ResponseEntity.ok(servicioLikesDislike.deleteALLRespuestas(idMensajeRespuesta));
    }



}

