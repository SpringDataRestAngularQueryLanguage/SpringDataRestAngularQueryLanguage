package org.company.example.relation_examples.one_to_one;

import javax.persistence.*;

@Entity
public class OneToOneB {
    @Id
    @GeneratedValue
    public long id;
    public String name;

    @OneToOne
    private OneToOneA refOneToOneA;

}
