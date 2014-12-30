package org.company.example.relation_examples.one_to_many_self;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "oneToManySelfA", path = "oneToManySelfA")
public interface ServiceOneToManySelfA extends JpaRepository<OneToManySelfA, Long> {

    List<OneToManySelfA> findByName(@Param("name") String name);

}