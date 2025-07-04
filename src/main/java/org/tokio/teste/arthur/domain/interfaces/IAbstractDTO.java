package org.tokio.teste.arthur.domain.interfaces;

import org.tokio.teste.arthur.domain.entity.AbstractObject;

public interface IAbstractDTO<T extends IAbstractEntity<?,?>> extends IEntity {

    T toEntity();
}
