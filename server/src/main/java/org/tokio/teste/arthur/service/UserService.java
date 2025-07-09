package org.tokio.teste.arthur.service;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.tokio.teste.arthur.domain.dto.UserDTO;
import org.tokio.teste.arthur.domain.entity.User;
import org.tokio.teste.arthur.domain.exception.AccessDeniedRuleException;
import org.tokio.teste.arthur.domain.exception.BusinessRuleException;
import org.tokio.teste.arthur.repository.IUserRepository;
import org.tokio.teste.arthur.security.CustomUserDetails;
import org.tokio.teste.arthur.security.CustomUserDetailsService;
import org.tokio.teste.arthur.security.JwtHelper;


import java.util.ArrayList;
import java.util.List;

import static org.tokio.teste.arthur.domain.enums.ResponseCodeEnum.TYPE_ERROR;


@EqualsAndHashCode(callSuper = true)
@Data
@Service
public class UserService extends AbstractService<User, UserDTO> {

    private final IUserRepository repository;

    private final AuthenticationManager authenticationManager;

    private final PasswordEncoder passwordEncoder;

	private final CustomUserDetailsService userDetailsService;

	public UserService(IUserRepository repository,
                       AuthenticationManager authenticationManager,
                       PasswordEncoder passwordEncoder,
                       CustomUserDetailsService userDetailsService) {
        this.repository = repository;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
		this.userDetailsService = userDetailsService;
	}

    @Transactional(rollbackFor = Exception.class)
    public UserDTO save(UserDTO dto, Boolean isSignUp) throws BusinessRuleException, AccessDeniedRuleException {

        User entity = dto.toEntity();
        if(!isSignUp) {
            Object cache = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            String nickname = ((CustomUserDetails) cache).getUsername();

            User father = this.findByNickname(nickname).toEntity();
            entity.setFather(father);
        }

        commonValidations(entity);
        if(entity.getId() == null) {
            beforeCreate(entity);
        } else {
            validateUpdatePermission(entity);
            beforeSave(entity);
        }
        return getRepository().save(entity).toDTO();
    }

    @Transactional(rollbackFor = Exception.class)
    public String quickUpdate(String originalNick, UserDTO dto) throws BusinessRuleException, AccessDeniedRuleException {
        User entity = repository.findByNickname(originalNick).orElse(null);
        if(entity == null) {
            throw new BusinessRuleException("error.resource.not.found", TYPE_ERROR);
        }

        entity.setEmail(dto.getEmail());
        entity.setNickname(dto.getNickname());
        entity.setName(dto.getName());

        UserDTO nEntity = this.save(entity.toDTO());

        UserDetails userDetails = userDetailsService.loadUserUuid(nEntity.getUuid().toString());
        UsernamePasswordAuthenticationToken upat = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(upat);

        return JwtHelper.generateToken(entity.getUuid().toString());
    }


    @Transactional(rollbackFor = Exception.class)
    public UserDTO findByNickname(String nickname) {
        return this.repository.findByNickname(nickname)
                .orElseThrow(() -> new BadCredentialsException("auth.bad_credentials"))
                .toDTO();
    }

    @Transactional
    public void changeTheme(String nickname) {
        User user = repository.findByNickname(nickname)
                .orElseThrow(() -> new BadCredentialsException("auth.bad_credentials"));
        user.setDarkTheme(!Boolean.TRUE.equals(user.getDarkTheme()));
        repository.save(user);
    }

    public List<UserDTO> findChildren(String nickname) {
        var res = this.repository.findByNickname(nickname);
		return res.map((User user) -> user.getChildren().stream().map(User::toDTO).toList()).orElseGet(ArrayList::new);
	}

    @Transactional(rollbackFor = Exception.class)
    public Boolean existsByNickname(String nickname, String email) {
        return this.repository.existsByNicknameOrEmail(nickname, email);
    }

    @Override
    protected void beforeCreate(User user) {
        user.setPassword(this.passwordEncoder.encode(user.getPassword()));
    }

    @Override
    protected void beforeSave(User user) {
        User u = this.repository.getReferenceById(user.getId());
        user.setPassword(u.getPassword());
    }

    public void commonValidations(User user) throws BusinessRuleException {

        if (!StringUtils.hasText(user.getNickname())) {
            throw new BusinessRuleException("user.error.login.required", TYPE_ERROR);
        }

        if (!StringUtils.hasText(user.getName())) {
            throw new BusinessRuleException("user.error.name.required", TYPE_ERROR);
        }

        if (!StringUtils.hasText(user.getEmail())) {
            throw new BusinessRuleException("user.error.email.required", TYPE_ERROR);
        }
    }
}
