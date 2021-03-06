package org.company.example.relation_examples.one;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "oneA", path = "oneA")
public interface ServiceOneA extends JpaRepository<OneA, Long> {

    List<OneA> findByName(@Param("name") String name);

}