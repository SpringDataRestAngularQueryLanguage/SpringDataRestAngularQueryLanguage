package org.company.example.relation_examples.one_to_many;

import javax.persistence.*;

@Entity
public class OneToManyB {
    @Id
    @GeneratedValue
    public long id;
    public String name;

    @ManyToOne
    @JoinColumn
    public OneToManyA refOneToManyA;

}
