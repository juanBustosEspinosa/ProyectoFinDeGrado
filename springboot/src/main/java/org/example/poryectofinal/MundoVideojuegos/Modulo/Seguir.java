package org.example.poryectofinal.MundoVideojuegos.Modulo;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Instant;
import java.time.LocalDateTime;

@Entity
@Table(name = "seguir")
public class Seguir {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "id_seguidor", nullable = false)
    private Usuario idSeguidor;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "id_seguido", nullable = false)
    private Usuario idSeguido;

    @Column(name = "fecha_seguir", nullable = false)
    private LocalDateTime fechaSeguir;
    @PrePersist
    public void prePersist() {
        if (this.fechaSeguir == null) {
            this.fechaSeguir = LocalDateTime.now();  // Asigna la fecha y hora actuales
        }
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Usuario getIdSeguidor() {
        return idSeguidor;
    }

    public void setIdSeguidor(Usuario idSeguidor) {
        this.idSeguidor = idSeguidor;
    }

    public Usuario getIdSeguido() {
        return idSeguido;
    }

    public void setIdSeguido(Usuario idSeguido) {
        this.idSeguido = idSeguido;
    }

    public LocalDateTime getFechaSeguir() {
        return fechaSeguir;
    }

    public void setFechaSeguir(LocalDateTime fechaSeguir) {
        this.fechaSeguir = fechaSeguir;
    }

}