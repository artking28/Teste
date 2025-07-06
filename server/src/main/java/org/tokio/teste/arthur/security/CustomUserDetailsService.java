package org.tokio.teste.arthur.security;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.tokio.teste.arthur.domain.entity.User;
import org.tokio.teste.arthur.domain.enums.ActionPermissionEnum;
import org.tokio.teste.arthur.repository.IUserRepository;

import java.util.List;
import java.util.Objects;
import java.util.stream.Stream;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final IUserRepository userRepository;

    public CustomUserDetailsService(IUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String nickname) throws UsernameNotFoundException {
        User user = userRepository.findByNickname(nickname)
                .orElseThrow(() -> new BadCredentialsException("auth.bad_credentials"));

        Stream<ActionPermissionEnum> permissions;
        if(Objects.equals(user.getKind(), "member")) {
            permissions = ActionPermissionEnum.getMemberRole().stream();
        } else {
            permissions = ActionPermissionEnum.getAdminRole().stream();
        }

        List<String> all = permissions.map(ActionPermissionEnum::name).toList();
        return org.springframework.security.core.userdetails.User
                .withUsername(user.getNickname())
                .password(user.getPassword())
                .authorities(all.toArray(new String[0]))
                .build();
    }
}
