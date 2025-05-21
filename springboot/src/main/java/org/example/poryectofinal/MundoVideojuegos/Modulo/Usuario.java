package org.example.poryectofinal.MundoVideojuegos.Modulo;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "usuario")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @NotNull
    @Min(value = 100000000, message = "El teléfono debe tener 9 dígitos")
    @Max(value = 999999999, message = "El teléfono debe tener 9 dígitos")    @Column(name = "telefono", nullable = false)
    private Integer telefono;

    @Size(max = 255)
    @NotNull
    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Size(max = 255)
    @NotNull
    @Column(name = "apellido", nullable = false)
    private String apellido;

    @Size(max = 255)
    @NotNull
    @Column(name = "nickname", nullable = false)
    private String nickname;

    @Column(name = "fecha_inicio", nullable = false)
    private LocalDateTime fechaInicio;

    // Este método se ejecutará antes de persistir la entidad
    @PrePersist
    public void prePersist() {
        if (this.fechaInicio == null) {
            this.fechaInicio = LocalDateTime.now();  // Asigna la fecha y hora actuales
        }
    }

    @NotNull
    @Lob
    @Column(name = "tipo", nullable = false)
    private String tipo;

    @Size(max = 255)
    @NotNull
    @Column(name = "correo", nullable = false)
    private String correo;

    @Size(max = 255)
    @NotNull
    @Column(name = "contrasena", nullable = false)
    private String contrasena;

    @Column(name = "imagen")
    private byte[] imagen;

//    @OneToOne(mappedBy = "idUsuario")
//    private Disenousuario disenousuario;
//
//    @OneToMany(mappedBy = "idDesarrollador")
//    private Set<Juego> juegos = new LinkedHashSet<>();
//
//    @OneToMany(mappedBy = "idUsuario")
//    private Set<LikesDislike> likesDislikes = new LinkedHashSet<>();
//
//    @OneToMany(mappedBy = "idUsuario")
//    private Set<Mensaje> mensajes = new LinkedHashSet<>();
//
//    @OneToMany(mappedBy = "idUsuario")
//    private Set<MensajeRespuesta> mensajeRespuestas = new LinkedHashSet<>();
//
//    @OneToMany(mappedBy = "idUsuario1")
//    private Set<Seguir> seguirs = new LinkedHashSet<>();

    public byte[] getImagen() {
        return imagen;
    }

    public void setImagen(byte[] imagen) {
        this.imagen = imagen;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getTelefono() {
        return telefono;
    }

    public void setTelefono(Integer telefono) {
        this.telefono = telefono;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public LocalDateTime getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(LocalDateTime fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }
//    public Disenousuario getDisenousuario() {
//        return disenousuario;
//    }
//
//    public void setDisenousuario(Disenousuario disenousuario) {
//        this.disenousuario = disenousuario;
//    }
//
//    public Set<Juego> getJuegos() {
//        return juegos;
//    }
//
//    public void setJuegos(Set<Juego> juegos) {
//        this.juegos = juegos;
//    }
//
//    public Set<LikesDislike> getLikesDislikes() {
//        return likesDislikes;
//    }
//
//    public void setLikesDislikes(Set<LikesDislike> likesDislikes) {
//        this.likesDislikes = likesDislikes;
//    }
//
//    public Set<Mensaje> getMensajes() {
//        return mensajes;
//    }
//
//    public void setMensajes(Set<Mensaje> mensajes) {
//        this.mensajes = mensajes;
//    }
//
//    public Set<MensajeRespuesta> getMensajeRespuestas() {
//        return mensajeRespuestas;
//    }
//
//    public void setMensajeRespuestas(Set<MensajeRespuesta> mensajeRespuestas) {
//        this.mensajeRespuestas = mensajeRespuestas;
//    }
//
//    public Set<Seguir> getSeguirs() {
//        return seguirs;
//    }
//
//    public void setSeguirs(Set<Seguir> seguirs) {
//        this.seguirs = seguirs;
//    }

}