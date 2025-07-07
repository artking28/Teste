package org.tokio.teste.arthur.service;

import org.hibernate.ObjectNotFoundException;
import org.springframework.data.domain.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.tokio.teste.arthur.domain.enums.ActionEnum;
import org.tokio.teste.arthur.domain.enums.ActionPermissionEnum;
import org.tokio.teste.arthur.domain.exception.AccessDeniedRuleException;
import org.tokio.teste.arthur.domain.exception.BusinessRuleException;
import org.tokio.teste.arthur.domain.interfaces.IAbstractDTO;
import org.tokio.teste.arthur.domain.interfaces.IAbstractEntity;
import org.tokio.teste.arthur.domain.noData.JsonMessage;
import org.tokio.teste.arthur.utils.FilteredPageRequest;

import java.util.List;

import static org.tokio.teste.arthur.domain.enums.ResponseCodeEnum.TYPE_ERROR;

@SuppressWarnings("RedundantThrows")
public abstract class AbstractService<T extends IAbstractEntity<T, DTO>, DTO extends IAbstractDTO<T>> implements IService<T, DTO> {

    abstract void beforeCreate(T entity) throws BusinessRuleException, AccessDeniedRuleException;

    abstract void beforeSave(T entity) throws BusinessRuleException, AccessDeniedRuleException;

    protected Long count() {
        return getRepository().count();
    }

    public DTO getById(Long id) {
        return getRepository().findById(id).map(IAbstractEntity::toDTO).orElse(null);
    }

    public List<DTO> select(DTO dto) throws BusinessRuleException, ObjectNotFoundException {
        List<T> ret;
        if (dto == null) {
            ret = this.getRepository().findAll();
        } else {
            Example<T> example = Example.of(dto.toEntity());
            ret = this.getRepository().findAll(example);
        }

        return ret.stream().map(IAbstractEntity::toDTO).toList();
    }

    public List<DTO> select(FilteredPageRequest<DTO> request) throws BusinessRuleException {
        var pageable = request.toSpringPageRequest();
        DTO filter = request.getContent();

        Page<T> page;
        if (filter == null) {
            page = this.getRepository().findAll(pageable);
        } else {
            Example<T> example = Example.of(filter.toEntity());
            page = this.getRepository().findAll(example, pageable);
        }

        return page.getContent().stream().map(IAbstractEntity::toDTO).toList();
    }

    @Transactional(rollbackFor = Exception.class)
    public DTO save(DTO dto) throws BusinessRuleException, AccessDeniedRuleException {

        T entity = dto.toEntity();
        commonValidations(entity);
        if(entity.getId() == null) {
            validateCreatePermission(entity);
            beforeCreate(entity);
        } else {
            validateUpdatePermission(entity);
            beforeSave(entity);
        }
        return getRepository().save(entity).toDTO();
    }

    @Transactional(rollbackFor = Exception.class)
    public void deleteById(Long id) throws BusinessRuleException, AccessDeniedRuleException {
        T entity = getRepository().getReferenceById(id);
        validateDeletePermission(entity);
        getRepository().deleteById(id);
    }

    protected void validateCreatePermission(T entity) throws BusinessRuleException, AccessDeniedRuleException {
        if(entity.getCheckAccessControl()) {
            ActionPermissionEnum permission = ActionPermissionEnum.getByAction(ActionEnum.CREATE, entity.getClass());
            if (hasNoAuthority(permission.name())) {
                throw new AccessDeniedRuleException(permission);
            }
        }
    }

    protected void validateUpdatePermission(T entity) throws BusinessRuleException, AccessDeniedRuleException {
        if(entity.getCheckAccessControl()) {
            ActionPermissionEnum permission = ActionPermissionEnum.getByAction(ActionEnum.UPDATE, entity.getClass());
            if (hasNoAuthority(permission.name())) {
                throw new AccessDeniedRuleException(permission);
            }
        }
    }

    protected void validateDeletePermission(T entity) throws BusinessRuleException, AccessDeniedRuleException {
        if(entity!=null && entity.getCheckAccessControl()) {
            ActionPermissionEnum permission = ActionPermissionEnum.getByAction(ActionEnum.DELETE, entity.getClass());
            if (hasNoAuthority(permission.name())) {
                throw new AccessDeniedRuleException(permission);
            }
        }
    }

    protected boolean hasNoAuthority(String authority) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth.getAuthorities().stream()
                .noneMatch((a) -> a.getAuthority().equals(authority));
    }

    protected abstract void commonValidations(T entity) throws BusinessRuleException;

}
