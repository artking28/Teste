package org.tokio.teste.arthur.service;

import org.hibernate.ObjectNotFoundException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.tokio.teste.arthur.domain.exception.AccessDeniedRuleException;
import org.tokio.teste.arthur.domain.exception.BusinessRuleException;
import org.tokio.teste.arthur.domain.interfaces.IAbstractDTO;
import org.tokio.teste.arthur.domain.interfaces.IAbstractEntity;

import java.util.List;

public interface IService<T extends IAbstractEntity<T, DTO>, DTO extends IAbstractDTO<T>> {

    JpaRepository<T, Long> getRepository();

    DTO getById(Long id);

    void deleteById(Long id) throws BusinessRuleException, AccessDeniedRuleException;

    DTO save(DTO dto) throws BusinessRuleException, AccessDeniedRuleException;

    List<DTO> select(DTO dto) throws BusinessRuleException, ObjectNotFoundException;
}
