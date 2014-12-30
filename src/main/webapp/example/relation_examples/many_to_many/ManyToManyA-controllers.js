/**** ManyToManyA ****************************************************************************************/
app.controller('manyToManyAListCtrl', ['$scope', '$rootScope','REST', '$location',
    function ($scope, $rootScope, REST, $location) {
        var parentId = $location.$$url.split('/')[2];
        $rootScope.parentId = parentId;
        activateMenu('manyToManyA-list');

        $scope.editEntity = function (entityId) {
            $location.path('/manyToManyA-detail/' + entityId);
        };

        $scope.deleteEntity = function (entityId) {
            REST.one('manyToManyA').withId(entityId).delete().then(function(response){
                if(parentId == null){
                    REST.one('manyToManyA').query().then(function(response){
                        if(response.data._embedded == null) {$scope.entities=[]; return;}
                        $scope.entities = response.data._embedded['manyToManyA'];
                    });
                }else{
                    REST.one('manyToManyB').withId(parentId).toMany('manyToManyA').query().then(function(response){
                        if(response.data._embedded == null) {$scope.entities=[]; return;}
                        $scope.entities = response.data._embedded['manyToManyA'];
                    });
                }
            });
        };

        $scope.createNewEntity = function () {
            $location.path('/manyToManyA-creation');
        };

        if(parentId == null){
            REST.one('manyToManyA').query().then(function(response){
                if(response.data._embedded == null) {$scope.entities=[]; return;}
                $scope.entities = response.data._embedded['manyToManyA'];
            });
        }else{
            REST.one('manyToManyB').withId(parentId).toMany('manyToManyA').query().then(function(response){
                if(response.data._embedded == null) {$scope.entities=[]; return;}
                $scope.entities = response.data._embedded['manyToManyA'];
            });
        }

    }]);


app.controller('manyToManyADetailCtrl', ['$scope', '$rootScope', '$routeParams', 'REST', '$location',
    function ($scope, $rootScope, $routeParams, REST, $location) {
        activateMenu('no-active-menu');
        var parentId = $rootScope.parentId;
        $rootScope.parentId = null;

        $scope.updateEntity = function () {
            REST.one('manyToManyA').withId($routeParams.id).update($scope.entity).then(function(response){
                if(parentId == null){
                    $location.path('/manyToManyA-list');
                }else{
                    $location.path('/manyToManyB-detail/' + parentId);
                }
            });
        }
        $scope.cancel = function () {
            if(parentId == null){
                $location.path('/manyToManyA-list');
            }else{
                $location.path('/manyToManyB-detail/' + parentId);
            }
        };
        $scope.deleteEntity = function () {
            REST.one('manyToManyA').withId($routeParams.id).delete().then(function(response){
                if(parentId == null){
                    $location.path('/manyToManyA-list');
                }else{
                    $location.path('/manyToManyB-detail/' + parentId);
                }
            });
        };

        REST.one('manyToManyA').withId($routeParams.id).show().then(function(response){
            $scope.entity = response.data;
        });
    }]);


app.controller('manyToManyACreationCtrl', ['$scope', '$rootScope', 'REST', '$location',
    function ($scope, $rootScope, REST, $location) {
        var parentId = $rootScope.parentId;
        $rootScope.parentId = null;
        activateMenu('no-active-menu');

        $scope.createNewEntity = function () {
            if(parentId == null){
                REST.one('manyToManyA').create($scope.entity).then(function(response){
                   var id = REST.getLastCreatedId();
                   $location.path('/manyToManyA-detail/' + id);
                });
            }else{
                REST.many('manyToManyB').withId(parentId).toMany('manyToManyA').create($scope.entity).then(function(response){
                  var id = REST.getIdFromHeaders(response.headers);
                  $location.path('/manyToManyA-detail/' + id);
               });
            }
        };

        $scope.cancel = function () {
            if(parentId == null){
                $location.path('/manyToManyA-list');
            }else{
                $location.path('/manyToManyB-detail/' + parentId);
            }
        };
    }]);
