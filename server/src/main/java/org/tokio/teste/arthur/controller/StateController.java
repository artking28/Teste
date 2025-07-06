package org.tokio.teste.arthur.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.tokio.teste.arthur.domain.dto.StateDTO;
import org.tokio.teste.arthur.domain.entity.State;
import org.tokio.teste.arthur.service.IService;
import org.tokio.teste.arthur.service.StateService;


@RestController
@RequestMapping("/state")
public class StateController extends AbstractController<State, StateDTO> {

    private static final Logger logger = LoggerFactory.getLogger(StateController.class);

    private final StateService stateService;

    public StateController(StateService stateService) {
        this.stateService = stateService;
    }

    @Override
    protected IService<State, StateDTO> getService() {
        return this.stateService;
    }
}
