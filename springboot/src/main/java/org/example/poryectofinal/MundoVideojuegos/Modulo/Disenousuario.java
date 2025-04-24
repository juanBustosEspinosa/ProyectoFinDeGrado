package org.example.poryectofinal.MundoVideojuegos.Modulo;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "disenousuario")
public class Disenousuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @NotNull
    @OneToOne(fetch = FetchType.EAGER, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario idUsuario;

    @Size(max = 50)
    @NotNull
    @Column(name = "color_fondo", nullable = false, length = 50)
    private String colorFondo;

    @Column(name = "imagen")
    private byte[] imagen;

    @Size(max = 100)
    @NotNull
    @Column(name = "letra_formato", nullable = false, length = 100)
    private String letraFormato;

    @Size(max = 500)
    @Column(name = "descripcion_usuario", length = 500)
    private String descripcionUsuario;

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

    public String getColorFondo() {
        return colorFondo;
    }

    public void setColorFondo(String colorFondo) {
        this.colorFondo = colorFondo;
    }

    public byte[] getImagen() {
        return imagen;
    }

    public void setImagen(byte[] imagen) {
        this.imagen = imagen;
    }

    public String getLetraFormato() {
        return letraFormato;
    }

    public void setLetraFormato(String letraFormato) {
        this.letraFormato = letraFormato;
    }

    public String getDescripcionUsuario() {
        return descripcionUsuario;
    }

    public void setDescripcionUsuario(String descripcionUsuario) {
        this.descripcionUsuario = descripcionUsuario;
    }

}