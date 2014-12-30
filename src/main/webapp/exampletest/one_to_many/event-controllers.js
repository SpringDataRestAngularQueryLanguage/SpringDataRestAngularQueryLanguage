/**** event ****************************************************************************************/
app.controller('eventListCtrl', ['$scope', 'REST', '$location',
    function ($scope, REST, $location) {
        activateMenu('event-list');

        $scope.editEntity = function (entityId) {
            $location.path('/event-detail/' + entityId);
        };
        $scope.deleteEntity = function (entityId) {
            REST.one('event').withId(entityId).delete().then(function(response){
                REST.one('event').query().then(function(response){
                    if(response.data._embedded == null) {$scope.entities=[]; return;}
                    $scope.entities = response.data._embedded['event'];
                });
            },function(reason) {
              alert('Failed: ' + angular.toJson(reason, true));
            });
        };
        $scope.createNewEntity = function () {
            $location.path('/event-creation');
        };

        REST.one('event').query().then(function(response){
            if(response.data._embedded == null) {$scope.entities=[]; return;}
            $scope.entities = response.data._embedded['event'];
        });
    }]);


app.controller('eventDetailCtrl', ['$scope', '$routeParams', 'REST', '$location',
    function ($scope, $routeParams, REST, $location) {
        activateMenu('no-active-menu');

        $scope.updateEntity = function () {
            REST.one('event').withId($routeParams.id).update($scope.entity).then(function(response){
                $location.path('/event-list');
            });
        };
        $scope.cancel = function () {
            $location.path('/event-list');
        };
        $scope.deleteEntity = function () {
            REST.one('event').withId($routeParams.id).delete().then(function(response){
                $location.path('/event-list');
            });
        };

        REST.one('event').withId($routeParams.id).show().then(function(response){
            $scope.entity = response.data;
        });
    }]);


app.controller('eventCreationCtrl', ['$scope', 'REST', '$location',
    function ($scope, REST, $location) {
        activateMenu('no-active-menu');

        $scope.createNewEntity = function () {
            REST.one('event').create($scope.entity).then(function(response){
               var id = REST.getIdFromHeaders(response.headers);
               $location.path('/event-detail/' + id);
            });
        };
        $scope.cancel = function () {
            $location.path('/event-list');
        };
    }]);
