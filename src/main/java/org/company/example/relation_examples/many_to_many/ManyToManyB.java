package org.company.example.relation_examples.many_to_many;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class ManyToManyB {
    @Id
    @GeneratedValue
    public long id;
    public String name;

    @ManyToMany
    private List<ManyToManyA> refManyToManyAs = new ArrayList<ManyToManyA>();

}
