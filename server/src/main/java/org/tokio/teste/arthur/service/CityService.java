package org.tokio.teste.arthur.service;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.stereotype.Service;
import org.tokio.teste.arthur.domain.dto.CityDTO;
import org.tokio.teste.arthur.domain.entity.City;
import org.tokio.teste.arthur.domain.exception.AccessDeniedRuleException;
import org.tokio.teste.arthur.domain.exception.BusinessRuleException;
import org.tokio.teste.arthur.repository.ICityRepository;


@EqualsAndHashCode(callSuper = true)
@Data
@Service
public class CityService extends AbstractService<City, CityDTO> {

    private final ICityRepository repository;

    public CityService(ICityRepository repository) {
        this.repository = repository;
    }

    @Override
    void beforeCreate(City entity) throws BusinessRuleException, AccessDeniedRuleException {

    }

    @Override
    void beforeSave(City entity) throws BusinessRuleException, AccessDeniedRuleException {

    }

    @Override
    protected void commonValidations(City entity) throws BusinessRuleException {

    }
}
