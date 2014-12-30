package org.company.example.relation_examples.many_to_many;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "manyToManyA", path = "manyToManyA")
public interface ServiceManyToManyA extends JpaRepository<ManyToManyA, Long> {

    List<ManyToManyA> findByName(@Param("name") String name);

}