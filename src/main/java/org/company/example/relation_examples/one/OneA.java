package org.company.example.relation_examples.one;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class OneA {
    @Id
    @GeneratedValue
    public long id;
    public String name;

}
