package org.company.exampletest.one_to_many;

import javax.persistence.*;

@Entity
public class Person {
    @Id
    @GeneratedValue
    public long id;
    public String name;

    @ManyToOne
    @JoinColumn
    public Event refEventAttended;

    @ManyToOne
    @JoinColumn
    public Event refEventHosted;

}
