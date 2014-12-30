package org.company.exampletest.one_to_many;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "event", path = "event")
public interface ServiceEvent extends JpaRepository<Event, Long> {

    List<Event> findByName(@Param("name") String name);

}