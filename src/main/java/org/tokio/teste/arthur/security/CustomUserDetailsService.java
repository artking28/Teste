package org.tokio.teste.arthur.security;

import lombok.Data;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.tokio.teste.arthur.domain.dto.UserDTO;
import org.tokio.teste.arthur.domain.entity.User;
import org.tokio.teste.arthur.repository.IUserRepository;

@Data
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private IUserRepository userRepository;

    private String ip;

    public CustomUserDetailsService(IUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String nickname) throws UsernameNotFoundException {
        User user = userRepository.findByNickname(nickname);
        if (user == null) throw new BadCredentialsException("auth.bad_credentials");

        UserDTO userDTO = user.toDTO();
        if (userDTO == null) throw new BadCredentialsException("auth.bad_credentials");

        return new CustomUserDetails(userDTO);
    }
}
