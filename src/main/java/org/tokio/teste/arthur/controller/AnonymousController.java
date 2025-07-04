package org.tokio.teste.arthur.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AnonymousController {

    @GetMapping("ping")
    protected ResponseEntity<String> ping() {
        return ResponseEntity.ok("pong");
    }
}
