/**** host ****************************************************************************************/
app.controller('hostListCtrl', ['$scope', '$rootScope', 'REST', '$location',
    function ($scope, $rootScope, REST, $location) {
        var parentId = $location.$$url.split('/')[2];
        $rootScope.parentId = parentId;

        $scope.editEntity = function (entityId) {
            $location.path('/host-detail/' + entityId);
        };
        $scope.deleteEntity = function (entityId) {
            REST.one('event').as('refEventHosted').withId(parentId)
                .toMany('person').as('refHosts').withId(entityId).delete().then(function(response){
                        REST.one('event').as('refEventHosted').withId(parentId)
                            .toMany('person').as('refHosts').query().then(function(response){
                                if(response.data._embedded == null) {$scope.entities=[]; return;}
                                $scope.entities = response.data._embedded['person'];
                });
            });
        };
        $scope.createNewEntity = function () {
            $location.path('/host-creation');
        };

        REST.one('event').as('refEventHosted').withId(parentId)
            .toMany('person').as('refHosts').query().then(function(response){
            if(response.data._embedded == null) {$scope.entities=[]; return;}
            $scope.entities = response.data._embedded['person'];
        });
    }]);


app.controller('hostDetailCtrl', ['$scope', '$rootScope','$http','$routeParams', 'REST', '$location',
    function ($scope, $rootScope, $http, $routeParams, REST, $location) {
        activateMenu('no-active-menu');
        var parentId = $rootScope.parentId;
        $rootScope.parentId = null;

        $scope.updateEntity = function () {
            REST.one('person').withId($routeParams.id).update($scope.entity).then(function(response){
                $location.path('/event-detail/' + parentId);
            });
        };
        $scope.cancel = function () {
            $location.path('/event-detail/' + parentId);
        };
        $scope.deleteEntity = function () {
            REST.one('event').as('refEventHosted').withId(parentId)
                .toMany('person').as('refHosts').withId($routeParams.id).delete().then(function(response){
                $location.path('/event-detail/' + parentId);
            });
        };

        REST.one('person').withId($routeParams.id).show().then(function(response){
            $scope.entity = response.data;
        });
    }]);

app.controller('hostCreationCtrl', ['$scope', '$rootScope', 'REST', '$location',
    function ($scope, $rootScope, REST, $location) {
        var parentId = $rootScope.parentId;
        $rootScope.parentId = null;
        activateMenu('no-active-menu');

        $scope.createNewEntity = function () {
            REST.one('event').as('refEventHosted').withId(parentId)
                .toMany('person').as('refHosts').create($scope.entity).then(function(response){
                $location.path('/event-detail/' + parentId);
            });
        };
        $scope.cancel = function () {
            $location.path('/event-detail/' + parentId);
        };
    }]);
