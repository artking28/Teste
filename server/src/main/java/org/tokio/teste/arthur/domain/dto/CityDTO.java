package org.tokio.teste.arthur.domain.dto;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.Hibernate;
import org.tokio.teste.arthur.domain.entity.AbstractObject;
import org.tokio.teste.arthur.domain.entity.City;
import org.tokio.teste.arthur.domain.entity.State;
import org.tokio.teste.arthur.domain.entity.User;
import org.tokio.teste.arthur.domain.interfaces.IAbstractDTO;
import org.tokio.teste.arthur.domain.interfaces.IAbstractEntity;

import java.util.Objects;

@Getter
@Setter
public class CityDTO extends AbstractObject implements IAbstractDTO<City> {

    private Long id;

    private String name;

    private String codigoIBGE;

    private State state;

    public City toEntity() {
        City ret = new City();
        ret.setId(this.id);
        ret.setName(this.name);
        ret.setCodigoIBGE(this.codigoIBGE);
        ret.setState(this.state);
        return ret;
    }
}
