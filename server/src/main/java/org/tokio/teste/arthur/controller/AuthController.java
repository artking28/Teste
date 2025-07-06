package org.tokio.teste.arthur.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.tokio.teste.arthur.domain.dto.UserDTO;
import org.tokio.teste.arthur.domain.exception.BusinessRuleException;
import org.tokio.teste.arthur.domain.noData.GenericResponse;
import org.tokio.teste.arthur.security.JwtHelper;
import org.tokio.teste.arthur.service.UserService;
import org.tokio.teste.arthur.utils.LoginRequestDTO;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    private final AuthenticationManager authenticationManager;

    private final UserService userService;

    public AuthController(AuthenticationManager authenticationManager, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<GenericResponse> login(@RequestBody LoginRequestDTO loginRequest) throws BusinessRuleException {

        try {
            UsernamePasswordAuthenticationToken upat = new UsernamePasswordAuthenticationToken(loginRequest.getNickname(), loginRequest.getPassword());
            authenticationManager.authenticate(upat);
            SecurityContextHolder.getContext().setAuthentication(upat);
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new GenericResponse("login.invalid_credentials"));
        }

        String token = JwtHelper.generateToken(loginRequest.getNickname());
        UserDTO user = userService.findByNickname(loginRequest.getNickname());

        return ResponseEntity.ok(new GenericResponse(user.toLoginResponseDTO(token)));
    }

    @PostMapping("/signup")
    public ResponseEntity<GenericResponse> signUp(@RequestBody UserDTO userDTO) throws BusinessRuleException {
        if (userService.existsByNickname(userDTO.getNickname(), userDTO.getEmail())) {
            throw new DuplicateKeyException("");
        }

        UserDTO savedUser = userService.save(userDTO);
        SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(userDTO.getNickname(), userDTO.getPassword()));
        String token = JwtHelper.generateToken(savedUser.getNickname());
        return ResponseEntity.status(HttpStatus.CREATED).body(new GenericResponse(savedUser.toLoginResponseDTO(token)));
    }
}
