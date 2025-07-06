package org.tokio.teste.arthur.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.tokio.teste.arthur.domain.dto.CityDTO;
import org.tokio.teste.arthur.domain.entity.City;
import org.tokio.teste.arthur.service.IService;
import org.tokio.teste.arthur.service.CityService;


@RestController
@RequestMapping("/city")
public class CityController extends AbstractController<City, CityDTO> {

    private static final Logger logger = LoggerFactory.getLogger(CityController.class);

    private final CityService cityService;

    public CityController(CityService cityService) {
        this.cityService = cityService;
    }

    @Override
    protected IService<City, CityDTO> getService() {
        return this.cityService;
    }
}
