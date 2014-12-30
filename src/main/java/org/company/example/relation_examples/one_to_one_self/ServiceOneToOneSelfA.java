package org.company.example.relation_examples.one_to_one_self;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "oneToOneSelfA", path = "oneToOneSelfA")
public interface ServiceOneToOneSelfA extends JpaRepository<OneToOneSelfA, Long> {

    List<OneToOneSelfA> findByName(@Param("name") String name);

}