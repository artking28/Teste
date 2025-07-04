package org.tokio.teste.arthur.service;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.tokio.teste.arthur.domain.dto.UserDTO;
import org.tokio.teste.arthur.domain.entity.User;
import org.tokio.teste.arthur.domain.exception.AccessDeniedRuleException;
import org.tokio.teste.arthur.domain.exception.BusinessRuleException;
import org.tokio.teste.arthur.repository.IUserRepository;
import org.tokio.teste.arthur.security.JwtTokenProvider;


import static org.tokio.teste.arthur.domain.enums.ResponseCodeEnum.TYPE_ERROR;


@EqualsAndHashCode(callSuper = true)
@Data
@Service
public class UserService extends AbstractService<User, UserDTO> {

    private final IUserRepository repository;

    private final AuthenticationManager authenticationManager;

    private final JwtTokenProvider jwtTokenProvider;

    public UserService(IUserRepository repository,
                       AuthenticationManager authenticationManager,
                       JwtTokenProvider jwtTokenProvider) {
        this.repository = repository;
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    protected void beforeCreate(User entity) throws BusinessRuleException, AccessDeniedRuleException {
    }

    @Override
    protected void beforeSave(User user) throws BusinessRuleException {
    }

    public void commonValidations(User user) throws BusinessRuleException {

        if(!StringUtils.hasText(user.getNickname())){
            throw new BusinessRuleException("user.error.login.required", TYPE_ERROR);
        }

        if(!StringUtils.hasText(user.getName())){
            throw new BusinessRuleException("user.error.name.required", TYPE_ERROR);
        }

        if(!StringUtils.hasText(user.getEmail())){
            throw new BusinessRuleException("user.error.email.required", TYPE_ERROR);
        }
    }
}
