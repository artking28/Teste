package org.tokio.teste.arthur.security;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.userdetails.UserDetails;

@Getter
@Setter
public class CustomUserDetails {
    private final Long userId;
    private final String username;

    public CustomUserDetails(Long userId, String username) {
        this.userId = userId;
        this.username = username;
    }
}
