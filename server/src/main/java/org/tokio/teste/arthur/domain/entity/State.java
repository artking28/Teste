package org.tokio.teste.arthur.domain.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.Hibernate;
import org.tokio.teste.arthur.domain.dto.StateDTO;
import org.tokio.teste.arthur.domain.dto.UserDTO;
import org.tokio.teste.arthur.domain.interfaces.IAbstractEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@Entity
@Table(name = "state")
public class State extends AbstractObject implements IAbstractEntity<State, StateDTO> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "acronym", nullable = false)
    private String acronym;

    @OneToMany(mappedBy = "state", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<City> cities = new ArrayList<>();

    public State() {
    }

    public State(String acronym) {
        this.acronym = acronym;
    }

    public State(String acronym, String name) {
        this.acronym = acronym;
        this.name = name;
    }

    public StateDTO toDTO() {
        StateDTO ret = new StateDTO();
        ret.setId(this.id);
        ret.setName(this.name);
        ret.setAcronym(this.acronym);
        ret.setCities(this.cities.stream().map(City::toDTO).toList());
        return ret;
    }

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> thisClass = Hibernate.getClass(this);
        Class<?> otherClass = Hibernate.getClass(o);
        if (!thisClass.equals(otherClass)) return false;
        State other = (State) o;
        return id != null && id.equals(other.id);
    }

    @Override
    public final int hashCode() {
        return Objects.hashCode(getId());
    }
}
