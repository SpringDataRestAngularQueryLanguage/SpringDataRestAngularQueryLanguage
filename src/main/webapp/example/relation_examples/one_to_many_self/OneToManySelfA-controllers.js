/**** oneToManySelfA ****************************************************************************************/
app.controller('oneToManySelfAListCtrl', ['$scope', '$rootScope', 'REST', '$location',
    function ($scope, $rootScope, REST, $location) {
        var parentId = $location.$$url.split('/')[2];
        $rootScope.parentId = parentId;

        $scope.editEntity = function (entityId) {
            $location.path('/oneToManySelfA-detail/' + entityId);
        };

        $scope.deleteEntity = function (entityId) {
            REST.one('oneToManySelfA').withId(entityId).delete().then(function(response){
                if(parentId){
                    REST.one('oneToManySelfA').withId(parentId).toMany('oneToManySelfA').query().then(function(response){
                        if(response.data._embedded == null) {$scope.entities=[]; return;}
                        $scope.entities = response.data._embedded['oneToManySelfA'];
                    });
                }else{
                    REST.one('oneToManySelfA').query().then(function(response){
                        if(response.data._embedded == null) {$scope.entities=[]; return;}
                        $scope.entities = response.data._embedded['oneToManySelfA'];
                    });
                }
            });
        };

        $scope.createNewEntity = function () {
            $location.path('/oneToManySelfA-creation');
        };

        if(parentId){
            REST.one('oneToManySelfA').withId(parentId).toMany('oneToManySelfA').query().then(function(response){
                if(response.data._embedded == null) {$scope.entities=[]; return;}
                $scope.entities = response.data._embedded['oneToManySelfA'];
            });
        }else{
            REST.one('oneToManySelfA').query().then(function(response){
                if(response.data._embedded == null) {$scope.entities=[]; return;}
                $scope.entities = response.data._embedded['oneToManySelfA'];
            });
        }
    }]);


app.controller('oneToManySelfADetailCtrl', ['$scope', '$rootScope','$http','$routeParams', 'REST', '$location',
    function ($scope, $rootScope, $http, $routeParams, REST, $location) {
        activateMenu('no-active-menu');
        var parentId = $rootScope.parentId;
        $rootScope.parentId = null;

        $scope.updateEntity = function () {
            REST.one('oneToManySelfA').withId($routeParams.id).update($scope.entity).then(function(response){
                if(parentId == null){
                    $location.path('/oneToManySelfA-list');
                }else{
                    $location.path('/oneToManySelfA-detail/' + parentId);
                }
            });
        };
        $scope.cancel = function () {
            $location.path('/oneToManySelfA-detail/' + parentId);
        };
        $scope.deleteEntity = function () {
            REST.one('oneToManySelfA').withId($scope.entity.id).delete().then(function(response){
                $location.path('/oneToManySelfA-detail/' + parentId);
            });
        };

        REST.one('oneToManySelfA').withId($routeParams.id).show().then(function(response){
            $scope.entity = response.data;
        });
    }]);

app.controller('oneToManySelfACreationCtrl', ['$scope', '$rootScope', 'REST', '$location',
    function ($scope, $rootScope, REST, $location) {
        var parentId = $rootScope.parentId;
        $rootScope.parentId = null;
        activateMenu('no-active-menu');

        $scope.createNewEntity = function () {
            if(parentId == null){
                REST.one('oneToManySelfA').create($scope.entity).then(function(response){
                    var id = REST.getIdFromHeaders(response.headers);
                    $location.path('/oneToManySelfA-detail/' + id);
                });
            }else{
                REST.one('oneToManySelfA').withId(parentId).toMany('oneToManySelfA').create($scope.entity).then(function(response){
                    $location.path('/oneToManySelfA-detail/' + parentId);
                })
            }
        };
        $scope.cancel = function () {
            if(parentId == null){
                $location.path('/oneToManySelfA-list');
            }else{
                $location.path('/oneToManySelfA-detail/' + parentId);
            }
        };
    }]);
