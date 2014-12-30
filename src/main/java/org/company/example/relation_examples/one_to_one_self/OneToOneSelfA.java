package org.company.example.relation_examples.one_to_one_self;

import javax.persistence.*;

@Entity
public class OneToOneSelfA {
    @Id
    @GeneratedValue
    public long id;
    public String name;

    @OneToOne//(cascade= CascadeType.ALL)
    private OneToOneSelfA refPOneToOneSelfA;
    @OneToOne//(cascade= CascadeType.ALL)
    private OneToOneSelfA refCOneToOneSelfA;

}
