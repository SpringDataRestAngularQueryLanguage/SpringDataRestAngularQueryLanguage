package org.company.common.config.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "user", path = "user")
public interface ServiceUser extends JpaRepository<User, Long> {

    User findByUsername(@Param("username") String name);

}