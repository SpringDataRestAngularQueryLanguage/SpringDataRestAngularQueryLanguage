package org.company.exampletest.one_to_many;

import org.company.example.relation_examples.one_to_many_self.OneToManySelfA;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "person", path = "person")
public interface ServicePerson extends JpaRepository<Person, Long> {

    List<OneToManySelfA> findByName(@Param("name") String name);

}