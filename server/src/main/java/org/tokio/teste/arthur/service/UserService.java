package org.tokio.teste.arthur.service;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.tokio.teste.arthur.domain.dto.UserDTO;
import org.tokio.teste.arthur.domain.entity.User;
import org.tokio.teste.arthur.domain.exception.AccessDeniedRuleException;
import org.tokio.teste.arthur.domain.exception.BusinessRuleException;
import org.tokio.teste.arthur.repository.IUserRepository;


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

    public UserService(IUserRepository repository,
                       AuthenticationManager authenticationManager,
                       PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional(rollbackFor = Exception.class)
    public UserDTO save(UserDTO dto) throws BusinessRuleException, AccessDeniedRuleException {

        User entity = dto.toEntity();
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
    public UserDTO findByNickname(String nickname) {
        return this.repository.findByNickname(nickname)
                .orElseThrow(() -> new BadCredentialsException("auth.bad_credentials"))
                .toDTO();
    }

    @Transactional(rollbackFor = Exception.class)
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
