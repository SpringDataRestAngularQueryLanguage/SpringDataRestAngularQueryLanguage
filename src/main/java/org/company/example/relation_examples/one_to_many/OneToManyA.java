package org.company.example.relation_examples.one_to_many;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class OneToManyA {
    @Id
    @GeneratedValue
    public long id;
    public String name;

    @OneToMany(mappedBy = "refOneToManyA"/*, cascade=CascadeType.ALL*/)
    public List<OneToManyB> refOneToManyBs = new ArrayList<OneToManyB>();

}
