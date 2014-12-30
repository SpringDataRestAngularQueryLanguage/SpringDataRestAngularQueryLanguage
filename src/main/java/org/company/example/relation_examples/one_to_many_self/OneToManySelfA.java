package org.company.example.relation_examples.one_to_many_self;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class OneToManySelfA {
    @Id
    @GeneratedValue
    public long id;
    public String name;

    @ManyToOne
    @JoinColumn
    private OneToManySelfA refOneToManySelfA;

    @OneToMany(mappedBy = "refOneToManySelfA"/*, cascade=CascadeType.ALL*/)
    private List<OneToManySelfA> refOneToManySelfAs = new ArrayList<OneToManySelfA>();

}
