package org.tokio.teste.arthur.service;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.tokio.teste.arthur.domain.dto.AddressDTO;
import org.tokio.teste.arthur.domain.dto.UserDTO;
import org.tokio.teste.arthur.domain.entity.Address;
import org.tokio.teste.arthur.domain.entity.User;
import org.tokio.teste.arthur.domain.exception.AccessDeniedRuleException;
import org.tokio.teste.arthur.domain.exception.BusinessRuleException;
import org.tokio.teste.arthur.repository.IAddressRepository;
import org.tokio.teste.arthur.repository.ICityRepository;
import org.tokio.teste.arthur.repository.IUserRepository;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.tokio.teste.arthur.domain.enums.ResponseCodeEnum.TYPE_ERROR;


@EqualsAndHashCode(callSuper = true)
@Data
@Service
public class AddressService extends AbstractService<Address, AddressDTO> {

    private final IAddressRepository repository;

    private final ICityRepository cityRepository;

    private final IUserRepository userRepository;

    private final AuthenticationManager authenticationManager;

    public AddressService(IAddressRepository repository,
                          ICityRepository cityRepository,
                          IUserRepository userRepository,
                          AuthenticationManager authenticationManager) {
        this.repository = repository;
        this.cityRepository = cityRepository;
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
    }

    public List<AddressDTO> getUserAddresses(Long userId) {
        var res = this.repository.findAddressesByUserId(userId);
        return res.stream().map(Address::toDTO).toList();
    }

    @Override
    protected void beforeCreate(Address entity) throws AccessDeniedRuleException {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        this.userRepository.findByNickname(userDetails.getUsername()).ifPresent(user -> entity.setUser(new User(user.getId())));
    }

    @Override
    protected void beforeSave(Address address) throws BusinessRuleException {
    }

    public void commonValidations(Address address) throws BusinessRuleException {
        if(address.getCity() == null || address.getCity().getId() == null) {
            throw new BusinessRuleException("address.error.city.required", TYPE_ERROR);
        }
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
    }
}
