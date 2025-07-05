package org.tokio.teste.arthur.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import org.tokio.teste.arthur.domain.dto.AddressDTO;
import org.tokio.teste.arthur.domain.entity.Address;
import org.tokio.teste.arthur.service.AddressService;
import org.tokio.teste.arthur.service.IService;
import org.tokio.teste.arthur.utils.ViaCepResponse;

import java.time.Duration;


@RestController
@RequestMapping("/address")
public class AddressController extends AbstractController<Address, AddressDTO> {

    private static final Logger logger = LoggerFactory.getLogger(AddressController.class);

    private final AddressService addressService;

    private final WebClient.Builder webClientBuilder;

    public AddressController(AddressService addressService, WebClient.Builder webClientBuilder) {
        this.addressService = addressService;
        this.webClientBuilder = webClientBuilder;
    }

    @Override
    protected IService<Address, AddressDTO> getService() {
        return this.addressService;
    }

    @GetMapping("/cep/{cep}")
    public ResponseEntity<AddressDTO> getAddressFromCep(@PathVariable String cep) {

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
        dto.setState(response.getUf());
        dto.setCity(response.getLocalidade());
        dto.setPostalCode(response.getCep());
        return ResponseEntity.ok(dto);
    }
}
