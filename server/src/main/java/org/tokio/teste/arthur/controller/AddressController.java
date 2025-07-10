package org.tokio.teste.arthur.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import org.tokio.teste.arthur.domain.dto.AddressDTO;
import org.tokio.teste.arthur.domain.entity.Address;
import org.tokio.teste.arthur.domain.entity.City;
import org.tokio.teste.arthur.domain.noData.GenericResponse;
import org.tokio.teste.arthur.security.CustomUserDetails;
import org.tokio.teste.arthur.service.AddressService;
import org.tokio.teste.arthur.service.CityService;
import org.tokio.teste.arthur.service.IService;
import org.tokio.teste.arthur.utils.ViaCepResponse;

import java.time.Duration;


@RestController
@RequestMapping("/address")
public class AddressController extends AbstractController<Address, AddressDTO> {

    private static final Logger logger = LoggerFactory.getLogger(AddressController.class);

    private final AddressService addressService;

    private final CityService cityService;

    private final WebClient.Builder webClientBuilder;

    public AddressController(AddressService addressService, CityService cityService, WebClient.Builder webClientBuilder) {
        this.addressService = addressService;
        this.cityService = cityService;
        this.webClientBuilder = webClientBuilder;
    }

    @Override
    protected IService<Address, AddressDTO> getService() {
        return this.addressService;
    }

    @GetMapping("/myAddresses")
    public ResponseEntity<GenericResponse> findChildren() {
        Object cache = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long userId = ((CustomUserDetails) cache).getId();
        var ret = this.addressService.getUserAddresses(userId);
        return ResponseEntity.ok(new GenericResponse(ret));
    }

    @GetMapping("/cep/{cep}")
    public ResponseEntity<GenericResponse> getAddressFromCep(@PathVariable String cep) {

        ViaCepResponse response = webClientBuilder.build()
                .get().uri(String.format("https://viacep.com.br/ws/%s/json/", cep))
                .retrieve()
                .bodyToMono(ViaCepResponse.class)
                .block(Duration.ofSeconds(10));

        if (response == null || Boolean.TRUE.equals(response.getErro())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        AddressDTO dto = new AddressDTO();
        dto.setStreet(response.getLogradouro());
        dto.setDistrict(response.getBairro());
        dto.setCity(this.cityService.findByCodigoIBGE(response.getIbge()));
        dto.setPostalCode(response.getCep());
        return ResponseEntity.ok(new GenericResponse(dto));
    }
}
