package org.tokio.teste.arthur.repository;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(
    basePackages = "org.tokio.teste.arthur.repository",
    repositoryBaseClass = BaseRepositoryImpl.class
)
public class JpaConfig {
}
