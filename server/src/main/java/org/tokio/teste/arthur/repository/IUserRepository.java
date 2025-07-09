package org.tokio.teste.arthur.repository;

import org.springframework.data.repository.NoRepositoryBean;
import org.tokio.teste.arthur.domain.entity.User;

import java.util.Optional;
import java.util.UUID;


public interface IUserRepository extends IBaseRepository<User, Long>, IRepository<User> {

    Optional<User> findByNickname(String nickname);

    Optional<User> findByUuid(UUID uuid);

    Boolean existsByNicknameOrEmail(String nickname, String email);
}
