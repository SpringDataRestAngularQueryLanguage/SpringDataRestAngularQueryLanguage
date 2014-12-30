/**** oneToManyA ****************************************************************************************/
app.controller('oneToManyAListCtrl', ['$scope', 'REST', '$location',
    function ($scope, REST, $location) {
        activateMenu('oneToManyA-list');

        $scope.editEntity = function (entityId) {
            $location.path('/oneToManyA-detail/' + entityId);
        };
        $scope.deleteEntity = function (entityId) {
            REST.one('oneToManyA').withId(entityId).delete().then(function(response){
                REST.one('oneToManyA').query().then(function(response){
                    if(response.data._embedded == null) {$scope.entities=[]; return;}
                    $scope.entities = response.data._embedded['oneToManyA'];
                })
            });
        };
        $scope.createNewEntity = function () {
            $location.path('/oneToManyA-creation');
        };

        REST.one('oneToManyA').query().then(function(response){
            if(response.data._embedded == null) {$scope.entities=[]; return;}
            $scope.entities = response.data._embedded['oneToManyA'];
        });
    }]);


app.controller('oneToManyADetailCtrl', ['$scope', '$routeParams', 'REST', '$location',
    function ($scope, $routeParams, REST, $location) {
        activateMenu('no-active-menu');

        $scope.updateEntity = function () {
            REST.one('oneToManyA').withId($routeParams.id).update($scope.entity).then(function(response){
                $location.path('/oneToManyA-list');
            });
        };
        $scope.cancel = function () {
            $location.path('/oneToManyA-list');
        };
        $scope.deleteEntity = function () {
            REST.one('oneToManyA').withId($routeParams.id).delete().then(function(response){
                $location.path('/oneToManyA-list');
            });
        };

        REST.one('oneToManyA').withId($routeParams.id).show().then(function(response){
            $scope.entity = response.data;
        });
    }]);


app.controller('oneToManyACreationCtrl', ['$scope', 'REST', '$location',
    function ($scope, REST, $location) {
        activateMenu('no-active-menu');

        $scope.createNewEntity = function () {
            REST.one('oneToManyA').create($scope.entity).then(function(response){
               var id = REST.getIdFromHeaders(response.headers);
               $location.path('/oneToManyA-detail/' + id);
            });
        };
        $scope.cancel = function () {
            $location.path('/oneToManyA-list');
        };
    }]);
