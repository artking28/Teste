package org.tokio.teste.arthur.utils;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class LoginResponseDTO implements Serializable {
    String token;
    String name;
    String language = "pt";
    Boolean dark = true;
    Date loginAt = new Date();
}
