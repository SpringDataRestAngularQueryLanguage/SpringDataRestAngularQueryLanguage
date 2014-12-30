/**** oneToOneA ****************************************************************************************/
app.controller('oneToOneAListCtrl', ['$scope', 'REST', '$location',
    function ($scope, REST, $location) {
        activateMenu('oneToOneA-list');

        $scope.editEntity = function (entityId) {
            $location.path('/oneToOneA-detail/' + entityId);
        };
        $scope.deleteEntity = function (entityId) {
            REST.one('oneToOneA').withId(entityId).delete().then(function(response){
                REST.one('oneToOneA').query().then(function(response){
                    if(response.data._embedded == null) {$scope.entities=[]; return;}
                    $scope.entities = response.data._embedded['oneToOneA'];
                })
            });
        };
        $scope.createNewEntity = function () {
            $location.path('/oneToOneA-creation');
        };

        REST.one('oneToOneA').query().then(function(response){
            if(response.data._embedded == null) {$scope.entities=[]; return;}
            $scope.entities = response.data._embedded['oneToOneA'];
        });
    }]);


app.controller('oneToOneADetailCtrl', ['$scope', '$routeParams', 'REST', '$location',
    function ($scope, $routeParams, REST, $location) {
        activateMenu('no-active-menu');

        $scope.updateEntity = function () {
            REST.one('oneToOneA').withId($routeParams.id).update($scope.entity).then(function(response){
                $location.path('/oneToOneA-list');
            });
        };
        $scope.cancel = function () {
            $location.path('/oneToOneA-list');
        };
        $scope.deleteEntity = function () {
            REST.one('oneToOneA').withId($routeParams.id).delete().then(function(response){
                $location.path('/oneToOneA-list');
            });
        };

        REST.one('oneToOneA').withId($routeParams.id).show().then(function(response){
            $scope.entity = response.data;
        });
    }]);


app.controller('oneToOneACreationCtrl', ['$scope', 'REST', '$location',
    function ($scope, REST, $location) {
        activateMenu('no-active-menu');

        $scope.createNewEntity = function () {
            REST.one('oneToOneA').create($scope.entity).then(function(response){
               var id = REST.getIdFromHeaders(response.headers);
               $location.path('/oneToOneA-detail/' + id);
            });
        };
        $scope.cancel = function () {
            $location.path('/oneToOneA-list');
        };
    }]);
