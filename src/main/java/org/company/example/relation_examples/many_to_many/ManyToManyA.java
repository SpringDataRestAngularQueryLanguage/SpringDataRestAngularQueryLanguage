package org.company.example.relation_examples.many_to_many;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class ManyToManyA {
    @Id
    @GeneratedValue
    public long id;
    public String name;

    @ManyToMany//(cascade=CascadeType.ALL)
    private List<ManyToManyB> refManyToManyBs = new ArrayList<ManyToManyB>();

}
