package org.tokio.teste.arthur.utils;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class LoginResponseDTO implements Serializable {
    Boolean ok = true;
    String token;
    String name;
    String email;
    String nickname;
    String language = "pt";
    Boolean dark = true;
    String kind;
    Date loginAt = new Date();
}
