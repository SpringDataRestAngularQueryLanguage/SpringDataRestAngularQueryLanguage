/**** manyToManyB ****************************************************************************************/
app.controller('manyToManyBListCtrl', ['$scope', '$rootScope', 'REST', '$location',
    function ($scope, $rootScope, REST, $location) {
        var parentId = $location.$$url.split('/')[2];
        $rootScope.parentId = parentId;

        $scope.editEntity = function (entityId) {
            $location.path('/manyToManyB-detail/' + entityId);
        };
        $scope.deleteEntity = function (entityId) {
            REST.one('manyToManyB').withId(entityId).delete().then(function(response){
                REST.one('manyToManyA').withId(parentId).toMany('manyToManyB').query().then(function(response){
                    if(response.data._embedded == null) {$scope.entities=[]; return;}
                    $scope.entities = response.data._embedded['manyToManyB'];
                });
            });
        };
        $scope.createNewEntity = function () {
            $location.path('/manyToManyB-creation');
        };

        REST.one('manyToManyA').withId(parentId).toMany('manyToManyB').query().then(function(response){
            if(response.data._embedded == null) {$scope.entities=[]; return;}
            $scope.entities = response.data._embedded['manyToManyB'];
        });
    }]);


app.controller('manyToManyBDetailCtrl', ['$scope', '$rootScope', '$routeParams', 'REST', '$location',
    function ($scope, $rootScope, $routeParams, REST, $location) {
        activateMenu('no-active-menu');
        var parentId = $rootScope.parentId;
        $rootScope.parentId = null;

        $scope.updateEntity = function () {
            REST.one('manyToManyB').withId($routeParams.id).update($scope.entity).then(function(response){
                $location.path('/manyToManyA-detail/' + parentId);
            });
        };
        $scope.cancel = function () {
            $location.path('/manyToManyA-detail/' + parentId);
        };
        $scope.deleteEntity = function () {
            REST.one('manyToManyB').withId($scope.entity.id).delete().then(function(response){
                $location.path('/manyToManyA-detail/' + parentId);
            });
        };

        REST.one('manyToManyB').withId($routeParams.id).show().then(function(response){
            $scope.entity = response.data;
        });
    }]);

app.controller('manyToManyBCreationCtrl', ['$scope', '$rootScope', 'REST', '$location',
    function ($scope, $rootScope, REST, $location) {
        var parentId = $rootScope.parentId;
        $rootScope.parentId = null;

        $scope.createNewEntity = function () {
            REST.many('manyToManyA').withId(parentId).toMany('manyToManyB').create($scope.entity).then(function(response){
                var id = REST.getLastCreatedId();
                $location.path('/manyToManyB-detail/' + id);
            });
        };
        $scope.cancel = function () {
            $location.path('/manyToManyA-detail/' + parentId);
        };
    }]);
