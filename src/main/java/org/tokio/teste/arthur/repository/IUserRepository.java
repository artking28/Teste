package org.tokio.teste.arthur.repository;

import org.springframework.data.repository.NoRepositoryBean;
import org.tokio.teste.arthur.domain.entity.User;


public interface IUserRepository extends IBaseRepository<User, Long>, IRepository<User> {

    User findByNickname(String nickname);

}
