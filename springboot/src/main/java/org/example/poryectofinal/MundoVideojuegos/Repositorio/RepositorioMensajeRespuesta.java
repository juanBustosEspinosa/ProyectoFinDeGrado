package org.example.poryectofinal.MundoVideojuegos.Repositorio;

import org.example.poryectofinal.MundoVideojuegos.Modulo.MensajeRespuesta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RepositorioMensajeRespuesta  extends JpaRepository<MensajeRespuesta,Integer> {
    MensajeRespuesta getMensajeRespuestaById(Integer id);



    List<MensajeRespuesta> findByIdMensaje_Id(Integer idMensaje);

    void deleteByIdMensaje_Id(Integer idMensajeId);

}
