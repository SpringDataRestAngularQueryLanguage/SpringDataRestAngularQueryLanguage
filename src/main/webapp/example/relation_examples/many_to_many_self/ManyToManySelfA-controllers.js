/**** manyToManySelfA ****************************************************************************************/
app.controller('manyToManySelfAListCtrl', ['$scope', '$rootScope', 'REST', '$location',
    function ($scope, $rootScope, REST, $location) {
        var parentId = $location.$$url.split('/')[2];
        $rootScope.parentId = parentId;

        $scope.editEntity = function (entityId) {
            $location.path('/manyToManySelfA-detail/' + entityId);
        };

        $scope.deleteEntity = function (entityId) {
            REST.one('manyToManySelfA').withId(entityId).delete().then(function(response){
                if(parentId){
                    REST.one('manyToManySelfA').withId(parentId).toMany('manyToManySelfA').query().then(function(response){
                        if(response.data._embedded == null) {$scope.entities=[]; return;}
                        $scope.entities = response.data._embedded['manyToManySelfA'];
                    });
                }else{
                    REST.one('manyToManySelfA').query().then(function(response){
                        if(response.data._embedded == null) {$scope.entities=[]; return;}
                        $scope.entities = response.data._embedded['manyToManySelfA'];
                    });
                }
            });
        };

        $scope.createNewEntity = function () {
            $location.path('/manyToManySelfA-creation');
        };

        if(parentId){
            REST.one('manyToManySelfA').withId(parentId).toMany('manyToManySelfA').query().then(function(response){
                if(response.data._embedded == null) {$scope.entities=[]; return;}
                $scope.entities = response.data._embedded['manyToManySelfA'];
            });
        }else{
            REST.one('manyToManySelfA').query().then(function(response){
                if(response.data._embedded == null) {$scope.entities=[]; return;}
                $scope.entities = response.data._embedded['manyToManySelfA'];
            });
        }
    }]);


app.controller('manyToManySelfADetailCtrl', ['$scope', '$rootScope','$http','$routeParams', 'REST', '$location',
    function ($scope, $rootScope, $http, $routeParams, REST, $location) {
        activateMenu('no-active-menu');
        var parentId = $rootScope.parentId;
        $rootScope.parentId = null;

        $scope.updateEntity = function () {
            REST.one('manyToManySelfA').withId($routeParams.id).update($scope.entity).then(function(response){
                if(parentId == null){
                    $location.path('/manyToManySelfA-list');
                }else{
                    $location.path('/manyToManySelfA-detail/' + parentId);
                }
            });
        };
        $scope.cancel = function () {
            if(parentId == null){
                $location.path('/manyToManySelfA-list');
            }else{
                $location.path('/manyToManySelfA-detail/' + parentId);
            }
        };
        $scope.deleteEntity = function () {
            REST.one('manyToManySelfA').withId($scope.entity.id).delete().then(function(response){
                if(parentId == null){
                    $location.path('/manyToManySelfA-list');
                }else{
                    $location.path('/manyToManySelfA-detail/' + parentId);
                }
            });
        };

        REST.one('manyToManySelfA').withId($routeParams.id).show().then(function(response){
            $scope.entity = response.data;
        });
    }]);

app.controller('manyToManySelfACreationCtrl', ['$scope', '$rootScope', 'REST', '$location',
    function ($scope, $rootScope, REST, $location) {
        var parentId = $rootScope.parentId;
        $rootScope.parentId = null;
        activateMenu('no-active-menu');

        $scope.createNewEntity = function () {
            if(parentId){
                REST.many('manyToManySelfA').withId(parentId).toMany('manyToManySelfA').create($scope.entity).then(function(response){
                   var id = REST.getLastCreatedId();
                   $location.path('/manyToManySelfA-detail/' + id);
                });
            }else{
                REST.one('manyToManySelfA').create($scope.entity).then(function(response){
                   var id = REST.getIdFromHeaders(response.headers);
                   $location.path('/manyToManySelfA-detail/' + id);
                });
            }
        };
        $scope.cancel = function () {
            if(parentId){
                $location.path('/manyToManySelfA-detail/' + parentId);
            }else{
                $location.path('/manyToManySelfA-list');
            }
        };
    }]);
