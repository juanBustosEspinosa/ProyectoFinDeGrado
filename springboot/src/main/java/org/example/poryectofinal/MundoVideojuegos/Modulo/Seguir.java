package org.example.poryectofinal.MundoVideojuegos.Modulo;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Instant;

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
    @JoinColumn(name = "id_usuario1", nullable = false)
    private Usuario idUsuario1;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "id_usuario2", nullable = false)
    private Usuario idUsuario2;

    @NotNull
    @Column(name = "fecha_seguir", nullable = false)
    private Instant fechaSeguir;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Usuario getIdUsuario1() {
        return idUsuario1;
    }

    public void setIdUsuario1(Usuario idUsuario1) {
        this.idUsuario1 = idUsuario1;
    }

    public Usuario getIdUsuario2() {
        return idUsuario2;
    }

    public void setIdUsuario2(Usuario idUsuario2) {
        this.idUsuario2 = idUsuario2;
    }

    public Instant getFechaSeguir() {
        return fechaSeguir;
    }

    public void setFechaSeguir(Instant fechaSeguir) {
        this.fechaSeguir = fechaSeguir;
    }

}