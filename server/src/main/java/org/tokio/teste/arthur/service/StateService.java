package org.tokio.teste.arthur.service;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.stereotype.Service;
import org.tokio.teste.arthur.domain.dto.StateDTO;
import org.tokio.teste.arthur.domain.entity.State;
import org.tokio.teste.arthur.domain.exception.AccessDeniedRuleException;
import org.tokio.teste.arthur.repository.IStateRepository;


@EqualsAndHashCode(callSuper = true)
@Data
@Service
public class StateService extends AbstractService<State, StateDTO> {

    private final IStateRepository repository;

    public StateService(IStateRepository repository) {
        this.repository = repository;
    }

    @Override
    void beforeCreate(State entity) throws AccessDeniedRuleException {

    }

    @Override
    void beforeSave(State entity) throws AccessDeniedRuleException {

    }

    @Override
    protected void commonValidations(State entity) {

    }
}
