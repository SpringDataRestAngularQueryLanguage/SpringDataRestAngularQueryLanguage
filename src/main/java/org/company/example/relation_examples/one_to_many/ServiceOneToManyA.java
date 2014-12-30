package org.company.example.relation_examples.one_to_many;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "oneToManyA", path = "oneToManyA")
public interface ServiceOneToManyA extends JpaRepository<OneToManyA, Long> {

    List<OneToManyA> findByName(@Param("name") String name);

}