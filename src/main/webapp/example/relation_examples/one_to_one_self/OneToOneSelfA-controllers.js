/**** oneToOneSelfA ****************************************************************************************/
app.controller('oneToOneSelfAListCtrl', ['$scope', '$rootScope', '$routeParams', 'REST', '$location',
    function ($scope, $rootScope, $routeParams, REST, $location) {
        var parentId = $location.$$url.split('/')[2];
        $rootScope.parentId = parentId;

        $scope.editEntity = function (entityId) {
            $location.path('/oneToOneSelfA-detail/' + entityId);
        };

        $scope.deleteEntity = function (entityId) {
            REST.one('oneToOneSelfA').withId(entityId).delete().then(function(response){
                REST.one('oneToOneSelfA').query().then(function(response){
                    if(response.data._embedded == null) {$scope.entities=[]; return;}
                    $scope.entities = response.data._embedded['oneToOneSelfA'];
                });
            });
        };

        $scope.createNewEntity = function () {
            $location.path('/oneToOneSelfA-creation');
        };

        if($routeParams.id != null){
            REST.one('oneToOneSelfA').withId($routeParams.id).toOne('oneToOneSelfA').show().then(function(response){
                $scope.entities=[response.data];
            });
        }else{
            activateMenu('oneToOneSelfA-list');
            REST.one('oneToOneSelfA').query().then(function(response){
                if(response.data._embedded == null) {$scope.entities=[]; return;}
                $scope.entities = response.data._embedded['oneToOneSelfA'];
            });
        }

    }]);


app.controller('oneToOneSelfADetailCtrl', ['$scope', '$routeParams', 'REST', '$location',
    function ($scope, $routeParams, REST, $location) {
        activateMenu('no-active-menu');

        $scope.updateEntity = function () {
            REST.one('oneToOneSelfA').withId($routeParams.id).update($scope.entity).then(function(response){
                $location.path('/oneToOneSelfA-list');
            });
        };

        $scope.cancel = function () {
            $location.path('/oneToOneSelfA-list');
        };

        $scope.deleteEntity = function () {
            REST.one('oneToOneSelfA').withId($routeParams.id).delete().then(function(response){
                $location.path('/oneToOneSelfA-list');
            });
        };

        REST.one('oneToOneSelfA').withId($routeParams.id).show().then(function(response){
            $scope.entity = response.data;
        });
    }]);


app.controller('oneToOneSelfACreationCtrl', ['$scope', '$rootScope', 'REST', '$location',
    function ($scope, $rootScope, REST, $location) {
        var parentId = $rootScope.parentId;
        $rootScope.parentId = null;
        activateMenu('no-active-menu');

        $scope.createNewEntity = function () {
            if(parentId == null){
                REST.one('oneToOneSelfA').create($scope.entity).then(function(response){
                   var id = REST.getIdFromHeaders(response.headers);
                   $location.path('/oneToOneSelfA-detail/' + id);
                });
            }else{
                REST.one('oneToOneSelfA').withId(parentId).toOne('oneToOneSelfA').create($scope.entity).then(function(response){
                   var id = REST.getLastCreatedId();
                   $location.path('/oneToOneSelfA-detail/' + id);
                });
            }
        };

        $scope.cancel = function () {
            if(parentId == null){
                $location.path('/oneToOneSelfA-list');
            }else{
                $location.path('/oneToOneSelfA-detail/' + parentId);
            }
        };

    }]);
