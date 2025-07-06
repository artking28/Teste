package org.tokio.teste.arthur.domain.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.Hibernate;
import org.tokio.teste.arthur.domain.dto.CityDTO;
import org.tokio.teste.arthur.domain.interfaces.IAbstractEntity;

import java.util.Objects;

@Getter
@Setter
@Entity
@Table(name = "city")
public class City extends AbstractObject implements IAbstractEntity<City, CityDTO> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "codigoIBGE", nullable = false)
    private String codigoIBGE;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "state_id")
    private State state;

    public City() {
    }

    public CityDTO toDTO() {
        CityDTO ret = new CityDTO();
        ret.setId(this.id);
        ret.setName(this.name);
        ret.setCodigoIBGE(this.codigoIBGE);
        ret.setState(this.state);
        return ret;
    }

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> thisClass = Hibernate.getClass(this);
        Class<?> otherClass = Hibernate.getClass(o);
        if (!thisClass.equals(otherClass)) return false;
        City other = (City) o;
        return id != null && id.equals(other.id);
    }

    @Override
    public final int hashCode() {
        return Objects.hashCode(getId());
    }
}
