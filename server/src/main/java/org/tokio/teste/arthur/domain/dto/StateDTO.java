package org.tokio.teste.arthur.domain.dto;

import lombok.Getter;
import lombok.Setter;
import org.tokio.teste.arthur.domain.entity.AbstractObject;
import org.tokio.teste.arthur.domain.entity.State;
import org.tokio.teste.arthur.domain.interfaces.IAbstractDTO;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class StateDTO extends AbstractObject implements IAbstractDTO<State> {

    private Long id;

    private String name;

    private String acronym;

    private List<CityDTO> cities = new ArrayList<>();

    public State toEntity() {
        State ret = new State();
        ret.setId(this.id);
        ret.setName(this.name);
        ret.setAcronym(this.acronym);
        return ret;
    }
}
