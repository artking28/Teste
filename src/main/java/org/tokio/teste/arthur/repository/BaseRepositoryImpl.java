package org.tokio.teste.arthur.repository;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.lang.NonNull;
import org.tokio.teste.arthur.domain.enums.ResponseCodeEnum;
import org.tokio.teste.arthur.domain.exception.DeleteRecordException;
import org.tokio.teste.arthur.domain.interfaces.IAbstractEntity;

public class BaseRepositoryImpl<T extends IAbstractEntity<?,?>, ID extends Long> extends SimpleJpaRepository<T, ID> implements IBaseRepository<T, ID> {

    public BaseRepositoryImpl(JpaEntityInformation<T, ?> entityInformation, EntityManager entityManager) {
        super(entityInformation, entityManager);
    }

    @Override
    @SuppressWarnings("all")
    @Transactional(rollbackOn = Exception.class)
    public void delete(@NonNull T entity) throws RuntimeException {
        super.delete(entity);
        if(super.existsById((ID) entity.getId()))
            throw new DeleteRecordException("error.delete.dataIntegrity", ResponseCodeEnum.TYPE_ERROR);
    }
}
