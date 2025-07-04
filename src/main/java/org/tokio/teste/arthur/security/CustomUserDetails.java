package org.tokio.teste.arthur.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.tokio.teste.arthur.domain.dto.UserDTO;

import java.util.Collection;
import java.util.Collections;

public class CustomUserDetails implements UserDetails {

    private final UserDTO userDTO;

    public CustomUserDetails(UserDTO userDTO) {
        this.userDTO = userDTO;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority(userDTO.getNickname()));
    }

    @Override public String getUsername() { return userDTO.getNickname(); }

    @Override public String getPassword() { return userDTO.getPassword(); }
}
