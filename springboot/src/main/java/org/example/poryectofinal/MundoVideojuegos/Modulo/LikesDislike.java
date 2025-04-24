package org.example.poryectofinal.MundoVideojuegos.Modulo;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "likes_dislikes")
public class LikesDislike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario idUsuario;

    @ManyToOne(fetch = FetchType.EAGER)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "id_mensaje")
    private Mensaje idMensaje;

    @ManyToOne(fetch = FetchType.EAGER)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "id_mensaje_respuesta")
    private MensajeRespuesta idMensajeRespuesta;

    @NotNull
    @Lob
    @Column(name = "tipo", nullable = false)
    private String tipo;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Usuario getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Usuario idUsuario) {
        this.idUsuario = idUsuario;
    }

    public Mensaje getIdMensaje() {
        return idMensaje;
    }

    public void setIdMensaje(Mensaje idMensaje) {
        this.idMensaje = idMensaje;
    }

    public MensajeRespuesta getIdMensajeRespuesta() {
        return idMensajeRespuesta;
    }

    public void setIdMensajeRespuesta(MensajeRespuesta idMensajeRespuesta) {
        this.idMensajeRespuesta = idMensajeRespuesta;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

}