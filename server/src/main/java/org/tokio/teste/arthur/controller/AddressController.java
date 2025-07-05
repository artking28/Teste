package org.tokio.teste.arthur.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.tokio.teste.arthur.domain.dto.AddressDTO;
import org.tokio.teste.arthur.domain.entity.Address;
import org.tokio.teste.arthur.service.AddressService;
import org.tokio.teste.arthur.service.IService;


@RestController
@RequestMapping("/address")
public class AddressController extends AbstractController<Address, AddressDTO> {

    private static final Logger logger = LoggerFactory.getLogger(AddressController.class);

    private final AddressService addressService;

    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @Override
    protected IService<Address, AddressDTO> getService() {
        return this.addressService;
    }
}
