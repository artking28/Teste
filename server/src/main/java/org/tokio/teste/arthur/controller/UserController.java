package org.tokio.teste.arthur.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.tokio.teste.arthur.domain.dto.UserDTO;
import org.tokio.teste.arthur.domain.entity.User;
import org.tokio.teste.arthur.domain.exception.BusinessRuleException;
import org.tokio.teste.arthur.domain.noData.GenericResponse;
import org.tokio.teste.arthur.service.IService;
import org.tokio.teste.arthur.service.UserService;


@RestController
@RequestMapping("/user")
public class UserController extends AbstractController<User, UserDTO> {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/changeTheme")
    public ResponseEntity<GenericResponse> changeTheme() {
        Object cache = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String nickname = ((org.springframework.security.core.userdetails.User) cache).getUsername();
        this.userService.changeTheme(nickname);
        return ResponseEntity.ok(new GenericResponse());
    }

    @PostMapping("/quickUpdate")
    public ResponseEntity<GenericResponse> changeTheme(@RequestBody UserDTO content) throws BusinessRuleException {
        Object cache = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String originalNick = ((org.springframework.security.core.userdetails.User) cache).getUsername();
        var ret = this.userService.quickUpdate(originalNick, content);
        return ResponseEntity.ok(new GenericResponse(ret));
    }

    @GetMapping("/findChildren")
    public ResponseEntity<GenericResponse> findChildren() {
        Object cache = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String nickname = ((org.springframework.security.core.userdetails.User) cache).getUsername();
        var ret = this.userService.findChildren(nickname);
        return ResponseEntity.ok(new GenericResponse(ret));
    }

    @Override
    protected IService<User, UserDTO> getService() {
        return this.userService;
    }
}
