package org.company.exampletest.one_to_many;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Event {
    @Id
    @GeneratedValue
    public long id;
    public String name;

    @OneToMany(mappedBy = "refEventAttended")
    public List<Person> refGuests = new ArrayList<Person>();

    @OneToMany(mappedBy = "refEventHosted")
    public List<Person> refHosts = new ArrayList<Person>();

}
