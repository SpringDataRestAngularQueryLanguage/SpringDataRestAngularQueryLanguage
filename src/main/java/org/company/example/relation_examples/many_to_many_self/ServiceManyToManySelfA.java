package org.company.example.relation_examples.many_to_many_self;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "manyToManySelfA", path = "manyToManySelfA")
public interface ServiceManyToManySelfA extends JpaRepository<ManyToManySelfA, Long> {

    List<ManyToManySelfA> findByName(@Param("name") String name);

}