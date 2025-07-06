package org.tokio.teste.arthur.repository;

import org.tokio.teste.arthur.domain.entity.State;


public interface IStateRepository extends IBaseRepository<State, Long>, IRepository<State> {

    State findByAcronym(String acronym);

}
