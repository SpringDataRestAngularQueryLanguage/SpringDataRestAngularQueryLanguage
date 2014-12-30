package org.company.example.relation_examples.one_to_one;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "oneToOneB", path = "oneToOneB")
public interface ServiceOneToOneB extends JpaRepository<OneToOneB, Long> {

    List<OneToOneA> findByName(@Param("name") String name);

}