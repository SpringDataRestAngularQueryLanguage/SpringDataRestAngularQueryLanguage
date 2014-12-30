/**** oneToManyB ****************************************************************************************/
app.controller('oneToManyBListCtrl', ['$scope', '$rootScope', 'REST', '$location',
    function ($scope, $rootScope, REST, $location) {
        var parentId = $location.$$url.split('/')[2];
        $rootScope.parentId = parentId;

        $scope.editEntity = function (entityId) {
            $location.path('/oneToManyB-detail/' + entityId);
        };
        $scope.deleteEntity = function (entityId) {
            REST.one('oneToManyB').withId(entityId).delete().then(function(response){
                REST.one('oneToManyA').withId(parentId).toMany('oneToManyB').query().then(function(response){
                    if(response.data._embedded == null) {$scope.entities=[]; return;}
                    $scope.entities = response.data._embedded['oneToManyB'];
                });
            });
        };
        $scope.createNewEntity = function () {
            $location.path('/oneToManyB-creation');
        };

        REST.one('oneToManyA').withId(parentId).toMany('oneToManyB').query().then(function(response){
            if(response.data._embedded == null) {$scope.entities=[]; return;}
            $scope.entities = response.data._embedded['oneToManyB'];
        });
    }]);


app.controller('oneToManyBDetailCtrl', ['$scope', '$rootScope','$http','$routeParams', 'REST', '$location',
    function ($scope, $rootScope, $http, $routeParams, REST, $location) {
        activateMenu('no-active-menu');
        var parentId = $rootScope.parentId;
        $rootScope.parentId = null;

        $scope.updateEntity = function () {
            REST.one('oneToManyB').withId($routeParams.id).update($scope.entity).then(function(response){
                $location.path('/oneToManyA-detail/' + parentId);
            });
        };
        $scope.cancel = function () {
            $location.path('/oneToManyA-detail/' + parentId);
        };
        $scope.deleteEntity = function () {
            REST.one('oneToManyB').withId($scope.entity.id).delete().then(function(response){
                $location.path('/oneToManyA-detail/' + parentId);
            });
        };

        REST.one('oneToManyB').withId($routeParams.id).show().then(function(response){
            $scope.entity = response.data;
        });
    }]);

app.controller('oneToManyBCreationCtrl', ['$scope', '$rootScope', 'REST', '$location',
    function ($scope, $rootScope, REST, $location) {
        var parentId = $rootScope.parentId;
        $rootScope.parentId = null;
        activateMenu('no-active-menu');

        $scope.createNewEntity = function () {
            REST.one('oneToManyA').withId(parentId).toMany('oneToManyB').create($scope.entity).then(function(response){
                $location.path('oneToManyA-detail/' + parentId);
            });
        };
        $scope.cancel = function () {
            $location.path('oneToManyA-detail/' + parentId);
        };
    }]);
