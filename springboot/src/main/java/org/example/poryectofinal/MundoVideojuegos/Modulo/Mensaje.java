package org.example.poryectofinal.MundoVideojuegos.Modulo;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "mensaje")
public class Mensaje {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario idUsuario;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "id_juego", nullable = false)
    private Juego idJuego;

    @NotNull
    @Lob
    @Column(name = "tipo", nullable = false)
    private String tipo;

    @Column(name = "puntuacion")
    private Float puntuacion;

    @ColumnDefault("0")
    @Column(name = "likes")
    private Integer likes;

    @ColumnDefault("0")
    @Column(name = "dislikes")
    private Integer dislikes;

    @Size(max = 500)
    @NotNull
    @Column(name = "descripcion", nullable = false, length = 500)
    private String descripcion;

    @NotNull
    @Column(name = "fecha", nullable = false)
    private Instant fecha;

    @Column(name = "imagen")
    private byte[] imagen;

//    @OneToMany(mappedBy = "idMensaje")
//    private Set<LikesDislike> likesDislikes = new LinkedHashSet<>();
//
//    @OneToMany(mappedBy = "idMensaje")
//    private Set<MensajeRespuesta> mensajeRespuestas = new LinkedHashSet<>();

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

    public Juego getIdJuego() {
        return idJuego;
    }

    public void setIdJuego(Juego idJuego) {
        this.idJuego = idJuego;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Float getPuntuacion() {
        return puntuacion;
    }

    public void setPuntuacion(Float puntuacion) {
        this.puntuacion = puntuacion;
    }

    public Integer getLikes() {
        return likes;
    }

    public void setLikes(Integer likes) {
        this.likes = likes;
    }

    public Integer getDislikes() {
        return dislikes;
    }

    public void setDislikes(Integer dislikes) {
        this.dislikes = dislikes;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Instant getFecha() {
        return fecha;
    }

    public void setFecha(Instant fecha) {
        this.fecha = fecha;
    }

    public byte[] getImagen() {
        return imagen;
    }

    public void setImagen(byte[] imagen) {
        this.imagen = imagen;
    }

//    public Set<LikesDislike> getLikesDislikes() {
//        return likesDislikes;
//    }
//
//    public void setLikesDislikes(Set<LikesDislike> likesDislikes) {
//        this.likesDislikes = likesDislikes;
//    }
//
//    public Set<MensajeRespuesta> getMensajeRespuestas() {
//        return mensajeRespuestas;
//    }
//
//    public void setMensajeRespuestas(Set<MensajeRespuesta> mensajeRespuestas) {
//        this.mensajeRespuestas = mensajeRespuestas;
//    }

}