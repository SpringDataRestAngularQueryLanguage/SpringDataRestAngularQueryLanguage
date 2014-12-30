# Running the project #

mvn spring-boot:run

Or

Run ApplicationMain class

The application should automatically open the default browser on the following url http://localhost:8080/common/html/index.html
//You may need to use mvn:clean if you want to run with the second option after you have used the first one

# Spring-Data-Rest-Angular Query Language (RestQL)
# [AngularJS] Client for web services generated with [Sring Data Rest]

This [DSL] offers you the option to think in terms of objects
and relationship between objects when interacting with web services generated by SPRING-DATA-REST.

For example suppose we have a one-to-many relationship between 'User' and 'Account' the following creates an 'Account'
and adds it to the list of accounts of the 'User' entity with the specified id,
also puts a reference to the 'User' in the 'Account' created:


```javascript
REST.one('User').withId(234)
    .toMany('Account').create(json).then(function(response){
    // create() returns a promise
    // do usefull stuff here when the promise is fulfield :)
});
```


***REST*** is declared as [factory function] in the ***services.js*** file.


List of available operations:
---
* REST.one('EntityName').create(json)
* REST.one('EntityName').withId(id).show() // ***gets one entity with the specified id***
* REST.one('EntityName').query() // ***gets the list of entities***
* REST.one('EntityName').withId(id).update(json)
* REST.one('EntityName').delete()


* REST.one('Master').withId(idMaster).toOne('Detail').withId(idDetail).bind() // ***puts a reference in Master to Detail and vice-versa***
* REST.one('Master').withId(idMaster).toOne('Detail').withId(idDetail).unbind() // ***delete the reference in Master to Detail and vice-versa***
* REST.one('Master').withId(idMaster).toOne('Detail').create(json) // ***creates Detail entity and binds it to Master and vice-versa***
* REST.one('Master').withId(idMaster).toOne('Detail').withId(idDetail).delete() // ***calls unbind() and then deletes Detail***
* REST.one('Master').withId(idMaster).toOne('Detail').show() // ***gets Detail of the Master***


* REST.one('Master').withId(idMaster).toMany('Detail').withId(idDetail).bind()
* REST.one('Master').withId(idMaster).toMany('Detail').withId(idDetail).unbind()
* REST.one('Master').withId(idMaster).toMany('Detail').create(json)
* REST.one('Master').withId(idMaster).toMany('Detail').withId(idDetail).delete()
* REST.one('Master').withId(idMaster).toMany('Detail').query() // ***gets the list of Detail of the Master***


* REST.many('Master').withId(idMaster).toMany('Detail').withId(idDetail).bind()
* REST.many('Master').withId(idMaster).toMany('Detail').withId(idDetail).unbind()
* REST.many('Master').withId(idMaster).toMany('Detail').create(json)
* REST.many('Master').withId(idMaster).toMany('Detail').withId(idDetail).delete()

* ***use update() function calling one().withId() for any type of relationship***
* ***use ONE-to-many query() function to see the list of 'Detail' belonging to 'Master' in a MANY-to-many relationship***



> The use cases above use a convention for naming the reference of 'Master' to 'Detail' and vice-versa.
If you want to change the default naming convention, modify getReferenceNameA() and getReferenceNameB()
from the ***services.js*** file.

For example suppose we have a many-to-many relationship between 'Event' and 'Person' and an 'Event'
has a list of 'Person' which represents the list of ***hosts*** and another list of 'Person' which
represents the list of ***guests***. They will have a different name so you will use the DSL in the
following way:

```javascript
REST.many('Event').as('refEventsAttended').withId(idEvent)
    .toMany('Person').as('refGuests').create(json).then(function(response){
    //...
});
```

#Examples:
In the project you'll find examples how to use the "Rest Query Language"
The convention of naming the source files and variables in examples is 'relation'+'A'/'B' where A - master and B - detail
e. g. oneToManyA, oneToManyB: oneToManyA has a one to many relationship with oneToManyB
also there are examples of relationship to itself e. g. oneToManyASelf: this means that oneToManyASelf has a one to
many relationship with oneToManyASelf
(think of a tree structure in which nodes have a list of child nodes)

[DSL]:http://en.wikipedia.org/wiki/Domain-specific_language
[Sring Data Rest]:http://github.com/spring-projects/spring-data-rest
[AngularJS]:http://angularjs.org
[factory function]:https://docs.angularjs.org/guide/services