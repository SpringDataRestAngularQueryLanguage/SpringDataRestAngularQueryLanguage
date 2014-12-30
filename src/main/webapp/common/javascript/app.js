'use strict';

// Declare app level module which depends on filters, and services
angular.module('ngdemo', ['ngdemo.filters', 'ngdemo.services', 'ngdemo.directives', 'ngdemo.controllers', 'ngRoute',])
            .config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {

        //*************************************************************************************************//
        var routes = [
            //oneA
            ['/oneA-list',                 '/example/relation_examples/one/OneA-list.html'],
            ['/oneA-detail/:id',           '/example/relation_examples/one/OneA-detail.html'],
            ['/oneA-creation',             '/example/relation_examples/one/OneA-creation.html'],


            //oneToOneA
            ['/oneToOneA-list',            '/example/relation_examples/one_to_one/OneToOneA-list.html'],
            ['/oneToOneA-detail/:id',      '/example/relation_examples/one_to_one/OneToOneA-detail.html'],
            ['/oneToOneA-creation',        '/example/relation_examples/one_to_one/OneToOneA-creation.html'],
            //oneToOneB
            ['/oneToOneB-detail/:id',      '/example/relation_examples/one_to_one/OneToOneB-detail.html'],
            ['/oneToOneB-creation',        '/example/relation_examples/one_to_one/OneToOneB-creation.html'],


            //oneToOneSelfA
            ['/oneToOneSelfA-list',        '/example/relation_examples/one_to_one_self/OneToOneSelfA-list.html'],
            ['/oneToOneSelfA-detail/:id',  '/example/relation_examples/one_to_one_self/OneToOneSelfA-detail.html'],
            ['/oneToOneSelfA-creation',    '/example/relation_examples/one_to_one_self/OneToOneSelfA-creation.html'],


            //oneToManyA
            ['/oneToManyA-list',           '/example/relation_examples/one_to_many/OneToManyA-list.html'],
            ['/oneToManyA-detail/:id',     '/example/relation_examples/one_to_many/OneToManyA-detail.html'],
            ['/oneToManyA-creation',       '/example/relation_examples/one_to_many/OneToManyA-creation.html'],
            //oneToManyB
            ['/oneToManyB-detail/:id',     '/example/relation_examples/one_to_many/OneToManyB-detail.html'],
            ['/oneToManyB-creation',       '/example/relation_examples/one_to_many/OneToManyB-creation.html'],

            //oneToManySelfA
            ['/oneToManySelfA-list',       '/example/relation_examples/one_to_many_self/OneToManySelfA-list.html'],
            ['/oneToManySelfA-detail/:id', '/example/relation_examples/one_to_many_self/OneToManySelfA-detail.html'],
            ['/oneToManySelfA-creation',   '/example/relation_examples/one_to_many_self/OneToManySelfA-creation.html'],


            //ManyToManyA
            ['/manyToManyA-list',           '/example/relation_examples/many_to_many/ManyToManyA-list.html'],
            ['/manyToManyA-detail/:id',     '/example/relation_examples/many_to_many/ManyToManyA-detail.html'],
            ['/manyToManyA-creation',       '/example/relation_examples/many_to_many/ManyToManyA-creation.html'],
            //ManyToManyB
            ['/manyToManyB-detail/:id',     '/example/relation_examples/many_to_many/ManyToManyB-detail.html'],
            ['/manyToManyB-creation',       '/example/relation_examples/many_to_many/ManyToManyB-creation.html'],


            //ManyToManySelfA
            ['/manyToManySelfA-list',       '/example/relation_examples/many_to_many_self/ManyToManySelfA-list.html'],
            ['/manyToManySelfA-detail/:id', '/example/relation_examples/many_to_many_self/ManyToManySelfA-detail.html'],
            ['/manyToManySelfA-creation',   '/example/relation_examples/many_to_many_self/ManyToManySelfA-creation.html'],

            //one-to-many test Event-Person
            //event
            ['/event-list',           '/exampletest/one_to_many/event-list.html'],
            ['/event-detail/:id',     '/exampletest/one_to_many/event-detail.html'],
            ['/event-creation',       '/exampletest/one_to_many/event-creation.html'],
            //person as host
            ['/host-detail/:id',      '/exampletest/one_to_many/host-detail.html'],
            ['/host-creation',        '/exampletest/one_to_many/host-creation.html']


        ]

        //*************************************************************************************************//
        for (var i=0; i < routes.length; i++) {
            $routeProvider.when(routes[i][0], {templateUrl: routes[i][1]});
        }
        $routeProvider.otherwise({redirectTo: '/oneA-list'});

        //CSRF
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRF-TOKEN';
    }])
//
// Menu style
function activateMenu(id){
    var elements = document.getElementsByClassName('listNav');
    for(var i = 0; i < elements.length; i++){
        elements[i].className = '';
    }
    if(id == 'no-active-menu'){return;}
    document.getElementById(id).className ='active listNav';
}