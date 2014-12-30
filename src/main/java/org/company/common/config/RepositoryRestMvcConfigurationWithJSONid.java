package org.company.common.config;

import org.company.common.config.user.User;
import org.company.example.relation_examples.many_to_many.ManyToManyA;
import org.company.example.relation_examples.many_to_many.ManyToManyB;
import org.company.example.relation_examples.many_to_many_self.ManyToManySelfA;
import org.company.example.relation_examples.one.OneA;
import org.company.example.relation_examples.one_to_many.OneToManyA;
import org.company.example.relation_examples.one_to_many.OneToManyB;
import org.company.example.relation_examples.one_to_many_self.OneToManySelfA;
import org.company.example.relation_examples.one_to_one.OneToOneA;
import org.company.example.relation_examples.one_to_one.OneToOneB;
import org.company.example.relation_examples.one_to_one_self.OneToOneSelfA;
import org.company.exampletest.one_to_many.Event;
import org.company.exampletest.one_to_many.Person;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;


@Configuration
public class RepositoryRestMvcConfigurationWithJSONid extends RepositoryRestMvcConfiguration {

    @Override
    protected void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(User.class);

        config.exposeIdsFor(OneA.class);

        config.exposeIdsFor(OneToOneA.class);
        config.exposeIdsFor(OneToOneB.class);

        config.exposeIdsFor(OneToOneSelfA.class);

        config.exposeIdsFor(OneToManyA.class);
        config.exposeIdsFor(OneToManyB.class);

        config.exposeIdsFor(OneToManySelfA.class);

        config.exposeIdsFor(ManyToManyA.class);
        config.exposeIdsFor(ManyToManyB.class);

        config.exposeIdsFor(ManyToManySelfA.class);

        config.exposeIdsFor(Event.class);
        config.exposeIdsFor(Person.class);

        //TO DO in the future this should be dynamic
    }


}