package org.tokio.teste.arthur.service;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.tokio.teste.arthur.domain.dto.AddressDTO;
import org.tokio.teste.arthur.domain.entity.Address;
import org.tokio.teste.arthur.domain.exception.AccessDeniedRuleException;
import org.tokio.teste.arthur.domain.exception.BusinessRuleException;
import org.tokio.teste.arthur.repository.IAddressRepository;

import static org.tokio.teste.arthur.domain.enums.ResponseCodeEnum.TYPE_ERROR;


@EqualsAndHashCode(callSuper = true)
@Data
@Service
public class AddressService extends AbstractService<Address, AddressDTO> {

    private final IAddressRepository repository;

    private final AuthenticationManager authenticationManager;


    public AddressService(IAddressRepository repository,
                          AuthenticationManager authenticationManager) {
        this.repository = repository;
        this.authenticationManager = authenticationManager;
    }

    @Override
    protected void beforeCreate(Address entity) throws BusinessRuleException, AccessDeniedRuleException {
    }

    @Override
    protected void beforeSave(Address address) throws BusinessRuleException {
    }

    public void commonValidations(Address address) throws BusinessRuleException {
        if (!StringUtils.hasText(address.getStreet())) {
            throw new BusinessRuleException("address.error.street.required", TYPE_ERROR);
        }
        if (address.getNumber() == null || address.getNumber() <= 0) {
            throw new BusinessRuleException("address.error.number.invalid", TYPE_ERROR);
        }
        if (!StringUtils.hasText(address.getAddition())) {
            throw new BusinessRuleException("address.error.addition.required", TYPE_ERROR);
        }
        if (!StringUtils.hasText(address.getDistrict())) {
            throw new BusinessRuleException("address.error.district.required", TYPE_ERROR);
        }
        if (!StringUtils.hasText(address.getPostalCode())) {
            throw new BusinessRuleException("address.error.postalCode.required", TYPE_ERROR);
        }
        if (address.getActive() == null) {
            throw new BusinessRuleException("address.error.active.required", TYPE_ERROR);
        }
    }
}
