/**** oneA ****************************************************************************************/
app.controller('oneToOneBListCtrl', ['$scope', '$rootScope','REST', '$location',
    function ($scope, $rootScope, REST, $location) {
        var parentId = $location.$$url.split('/')[2];
        $rootScope.parentId = parentId;

        $scope.editEntity = function (entityId) {
            $location.path('/oneToOneB-detail/' + entityId);
        };
        $scope.deleteEntity = function (entityId) {
           REST.one('oneToOneA').withId(parentId).toOne('oneToOneB').withId(entityId).unbind().then(function(response){
                REST.one('oneToOneB').withId(entityId).delete().then(function(response){
                   REST.one('oneToOneA').withId(parentId).toOne('oneToOneB').show().then(function(response){
                       if(response.data._embedded == null) {$scope.entities=[]; return;}
                       $scope.entities = response.data._embedded['oneToOneB'];
                   },function (error) {
                       $scope.entities=[];
                   });
               });
           });
        };
        $scope.createNewEntity = function () {
            $location.path('/oneToOneB-creation');
        };

        REST.one('oneToOneA').withId(parentId).toOne('oneToOneB').show().then(function(response){
            $scope.entities=[response.data];
        });
    }]);


app.controller('oneToOneBDetailCtrl', ['$scope', '$rootScope','$routeParams', 'REST', '$location',
    function ($scope, $rootScope, $routeParams, REST, $location) {
        activateMenu('no-active-menu');
        var parentId = $rootScope.parentId;
        $rootScope.parentId = null;

        $scope.updateEntity = function () {
            REST.one('oneToOneB').withId($routeParams.id).update($scope.entity).then(function(response){
                $location.path('/oneToOneA-detail/' + parentId);
            });
        };
        $scope.cancel = function () {
            $location.path('/oneToOneA-detail/' + parentId);
        };
        $scope.deleteEntity = function () {
       // REST.one('oneToOneA').withId(parentId).toOne('oneToOneB').withId(entityId).unbind().then(function(response){
           REST.one('oneToOneB').withId($routeParams.id).delete().then(function(response){
                $location.path('/oneToOneA-detail/' + parentId);
           });
        };

        REST.one('oneToOneB').withId($routeParams.id).show().then(function(response){
            $scope.entity = response.data;
        });
    }]);


app.controller('oneToOneBCreationCtrl', ['$scope', '$rootScope', 'REST', '$location',
    function ($scope, $rootScope, REST, $location) {
        var parentId = $rootScope.parentId;
        $rootScope.parentId = null;
        activateMenu('no-active-menu');

        $scope.createNewEntity = function () {
            REST.one('oneToOneA').withId(parentId).toOne('oneToOneB').create($scope.entity).then(function(response){
                $location.path('/oneToOneA-detail/' + parentId);
            });
        };
        $scope.cancel = function () {
            $location.path('/oneToOneA-detail/' + parentId);
        };
    }]);
