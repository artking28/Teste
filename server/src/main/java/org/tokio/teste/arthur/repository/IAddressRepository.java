package org.tokio.teste.arthur.repository;

import org.tokio.teste.arthur.domain.entity.Address;

import java.util.List;


public interface IAddressRepository extends IBaseRepository<Address, Long>, IRepository<Address> {

    List<Address> findAddressesByUserId(Long userId);

}
