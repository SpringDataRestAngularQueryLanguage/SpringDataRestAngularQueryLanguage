package org.company.example.relation_examples.many_to_many_self;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class ManyToManySelfA {
    @Id
    @GeneratedValue
    public long id;
    public String name;

    @ManyToMany//(cascade=CascadeType.ALL)
    private List<ManyToManySelfA> refManyToManySelfAs = new ArrayList<ManyToManySelfA>();

}
