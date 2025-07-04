package org.tokio.teste.arthur.domain.interfaces;


public interface IAbstractEntity<T extends IAbstractEntity<?, ?>, DTO extends IAbstractDTO<T>> extends IEntity {

    DTO toDTO();

}
