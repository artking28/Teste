package org.tokio.teste.arthur.repository;


import org.tokio.teste.arthur.domain.interfaces.IAbstractEntity;

public interface IRepository<T extends IAbstractEntity<T, ?>> { }
