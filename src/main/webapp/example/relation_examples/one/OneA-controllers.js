/**** oneA ****************************************************************************************/
app.controller('oneAListCtrl', ['$scope', 'REST', '$location',
    function ($scope, REST, $location) {
        activateMenu('oneA-list');

        $scope.editEntity = function (entityId) {
            $location.path('/oneA-detail/' + entityId);
        };
        $scope.deleteEntity = function (entityId) {
            REST.one('oneA').withId(entityId).delete().then(function(response){
                REST.one('oneA').query().then(function(response){
                    if(response.data._embedded == null) {$scope.entities=[]; return;}
                    $scope.entities = response.data._embedded['oneA'];
                })
            });
        };
        $scope.createNewEntity = function () {
            $location.path('/oneA-creation');
        };

        REST.one('oneA').query().then(function(response){
            if(response.data._embedded == null) {$scope.entities=[]; return;}
            $scope.entities = response.data._embedded['oneA'];
        });
    }]);


app.controller('oneADetailCtrl', ['$scope', '$routeParams', 'REST', '$location',
    function ($scope, $routeParams, REST, $location) {
        activateMenu('no-active-menu');

        $scope.updateEntity = function () {
            REST.one('oneA').withId($routeParams.id).update($scope.entity).then(function(response){
                $location.path('/oneA-list');
            });
        };
        $scope.cancel = function () {
            $location.path('/oneA-list');
        };
        $scope.deleteEntity = function () {
            REST.one('oneA').withId($routeParams.id).delete().then(function(response){
                $location.path('/oneA-list');
            });
        };

        REST.one('oneA').withId($routeParams.id).show().then(function(response){
            $scope.entity = response.data;
        });
    }]);


app.controller('oneACreationCtrl', ['$scope', 'REST', '$location',
    function ($scope, REST, $location) {
        activateMenu('no-active-menu');

        $scope.createNewEntity = function () {
            REST.one('oneA').create($scope.entity).then(function(response){
               var id = REST.getIdFromHeaders(response.headers);
               $location.path('/oneA-detail/' + id);
            });
        };
        $scope.cancel = function () {
            $location.path('/oneA-list');
        };
    }]);
