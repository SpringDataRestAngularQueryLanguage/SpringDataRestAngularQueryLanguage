package org.company.example.relation_examples.one_to_one;

import javax.persistence.*;

@Entity
public class OneToOneA {
    @Id
    @GeneratedValue
    public long id;
    public String name;

    @OneToOne//(cascade=CascadeType.ALL)
    private OneToOneB refOneToOneB;

}
