'use strict';

var app = angular.module('ngdemo.controllers', []);

// Clear browser cache (in development mode)
// http://stackoverflow.com/questions/14718826/angularjs-disable-partial-caching-on-dev-machine
app.run(function ($rootScope, $templateCache) {
    $rootScope.$on('$viewContentLoaded', function () {
        $templateCache.removeAll();
    });
});

//$scope.$apply(); !!?Important?!! The call will update the view in an async call
/*******************************************************************************************************/
