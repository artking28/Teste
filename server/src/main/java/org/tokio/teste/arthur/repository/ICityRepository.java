package org.tokio.teste.arthur.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.tokio.teste.arthur.domain.entity.City;

import java.util.Optional;


public interface ICityRepository extends IBaseRepository<City, Long>, IRepository<City> {

    @Query("SELECT c FROM City c JOIN FETCH c.state WHERE c.codigoIBGE = :codigoIBGE")
    Optional<City> findByCodigoIBGEWithState(@Param("codigoIBGE") String codigoIBGE);

}
