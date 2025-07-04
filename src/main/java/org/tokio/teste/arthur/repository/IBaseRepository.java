package org.tokio.teste.arthur.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;
import org.tokio.teste.arthur.domain.interfaces.IAbstractEntity;

import java.io.Serializable;


@NoRepositoryBean
public interface IBaseRepository<T extends IAbstractEntity<?,?>, ID extends Serializable> extends JpaRepository<T, ID> {
}
