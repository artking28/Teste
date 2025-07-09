package org.tokio.teste.arthur.security;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@Setter
@Getter
public class CustomUserDetails implements UserDetails {

    private final Long id;

    private final String uuid;

    private final String username;

    private final String password;

    private final Collection<? extends GrantedAuthority> authorities;

    public CustomUserDetails(Long id, String uuid, String username, String password, Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.uuid = uuid;
        this.username = username;
        this.password = password;
        this.authorities = authorities;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }
}
