package org.example.poryectofinal.MundoVideojuegos.Modulo;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "juego")
public class Juego {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "id_desarrollador", nullable = false)
    private Usuario idDesarrollador;

    @Size(max = 255)
    @NotNull
    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Lob
    @NotNull
    @Column(name = "descripcion")
    private String descripcion;

    @NotNull
    @Column(name = "fecha_lanzamiento")
    private LocalDate fechaLanzamiento;

    @Size(max = 100)
    @NotNull
    @Column(name = "genero1", nullable = false, length = 100)
    private String genero1;

    @Size(max = 100)
    @Column(name = "genero2", length = 100)
    private String genero2;

    @Lob
    @NotNull
    @Column(name = "tipo", nullable = false)
    private String tipo;

    @Column(name = "imagen")
    private byte[] imagen;

//    @OneToMany(mappedBy = "idJuego")
//    private Set<Mensaje> mensajes = new LinkedHashSet<>();
//
//    @OneToMany(mappedBy = "idJuego")
//    private Set<MensajeRespuesta> mensajeRespuestas = new LinkedHashSet<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Usuario getIdDesarrollador() {
        return idDesarrollador;
    }

    public void setIdDesarrollador(Usuario idDesarrollador) {
        this.idDesarrollador = idDesarrollador;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public LocalDate getFechaLanzamiento() {
        return fechaLanzamiento;
    }

    public void setFechaLanzamiento(LocalDate fechaLanzamiento) {
        this.fechaLanzamiento = fechaLanzamiento;
    }

    public String getGenero1() {
        return genero1;
    }

    public void setGenero1(String genero1) {
        this.genero1 = genero1;
    }

    public String getGenero2() {
        return genero2;
    }

    public void setGenero2(String genero2) {
        this.genero2 = genero2;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public byte[] getImagen() {
        return imagen;
    }

    public void setImagen(byte[] imagen) {
        this.imagen = imagen;
    }

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

}