'use strict';
var services = angular.module('ngdemo.services', ['ngResource']);

services.factory('REST',function($http, $q) {

    var factory = {};

    function CustomException(message) {
       this.message = message;
       this.name = "CustomException";
    };

    var A = false;
    var B = false;
    var idA = false;
    var idB = false;
    var referenceNameA = false;
    var referenceNameB = false;

    var one = false;
    var toOne = false;
    var toMany = false;
    var many = false;

    var selfPrefixC = "";//Child
    var selfPrefixP = "";//Parent

    var lastCreatedId = false;
    //used when you create then you bind and you get the promise of the bind(not the response form create)
    factory.getLastCreatedId = function(){
        return lastCreatedId;
    }

    function init(){one=false; toOne=false; toMany=false; many=false; A=false; B=false; idA=false; idB=false;};

    factory.getIdFromHeaders = function(headers){
         var arrayURL = headers(['location']).split('/');
         var id = arrayURL[arrayURL.length - 1];
         lastCreatedId = id;
         return id;
    };

    factory.one = function (a){
        init();
        one = true;
        A = a;
        return factory;
    };
    factory.many = function(a){
        init();
        many = true;
        A = a;
        return factory;
    };
    factory.toOne = function(b){
        if (many){throw new CustomException("use only one_to_one, one_to_many, many_to_many");}
        toOne = true;
        B = b;
        return factory;
    };
    factory.toMany = function(b){
        check();
        toMany = true;
        B = b;
        return factory;
    };
    //if the referenceName to the entity has a different name than the convention ref + 'EntityName' or
    // ref + 'EntityName' + s , then use the flowing function to set the referenceName
    factory.as = function(rn){
        check();
        if(!referenceNameA){ referenceNameA = rn; }else{ referenceNameB = rn; }
        return factory;
    }
    function getReferenceNameA(){
        if(referenceNameA) {return referenceNameA}
        //if your convention for naming reference is different, change here
        else{
           if(one){
               //one-to-one
               if(toOne){
                   var selfPrefix = (A === B) ? "P" : "";
                   return 'ref'+selfPrefix+capitaliseFirstLetter(A);
               //one-to-many
               }else if(toMany){
                   return 'ref'+capitaliseFirstLetter(A);
               //one
               }else{
                   return 'ref'+capitaliseFirstLetter(A);
               }
           //many-to-many
           }else{
               return 'ref'+capitaliseFirstLetter(A)+'s';
           }
        }
    };
    function getReferenceNameB(){
        if(referenceNameB) {return referenceNameB}
        //if your convention for naming reference is different, change here
        else{
           if(one){
               //one-to-one
               if(toOne){
                   var selfPrefix = (A === B) ? "C" : "";
                   return 'ref'+selfPrefix+capitaliseFirstLetter(B);
               //one-to-many
               }else if(toMany){
                   return 'ref'+capitaliseFirstLetter(B)+'s';
               //one
               }else{
                   return 'ref'+capitaliseFirstLetter(B);
               }
           //many-to-many
           }else{
               return 'ref'+capitaliseFirstLetter(B)+'s';
           }
        }
    };
//
    factory.withId = function(id){
        check();
        if(!idA){idA = id;} else {idB = id;}
        return factory;
    };
//
    function check(){if(!one&&!many){throw new CustomException("call one() or many() first")}}
//
    function relationSelector(one_fun, one_to_one_fun, one_to_many_fun, many_to_many_fun){
        check();
        if(one){
            //one-to-one
            if(toOne){
                return one_to_one_fun();
            //one-to-many
            }else if(toMany){
                return one_to_many_fun();
            //one
            }else{
                return one_fun();
            }
        //many-to-many
        }else{
            return many_to_many_fun();
        }
        init();
    };

    factory.query = function(){
        return relationSelector(
            //one
            function(){
                return $http({
                    method: 'GET',
                    url: '/'+A,
                    withCredentials : true
                });
            },
            //one-to-one
            function(){
                throw new CustomException("for one_to_one use show()");
            },
            //one-to-many
            function(){
                if(!idA){throw new CustomException("call withId() first")}
                return $http({
                    method: 'GET',
                    url: '/'+A+'/'+idA+'/'+getReferenceNameB(),
                    withCredentials : true
                });
            },
            //many-to-many
            function(){
                throw new CustomException("use one().withId().toMany().query()");
            }
        );
    };

    factory.show = function(){
        if(!idA){throw new CustomException("call withId() first")}
        return relationSelector(
            //one
            function(){
                return $http({
                    method: 'GET',
                    url: '/'+A+'/'+idA,
                    withCredentials : true
                });
            },
            //one-to-one
            function(){
                return $http({
                    method: 'GET',
                    url: '/'+A+'/'+idA+'/'+getReferenceNameB(),
                    withCredentials : true
                });
            },
            //one-to-many
            function(){
                throw new CustomException("use query() instead/or use one() with show()");
            },
            //many-to-many
            function(){
                throw new CustomException("use query() instead/or use one() with show()");
            }
        );
    };

    factory.create = function(json){
        return relationSelector(
            //one
            function(){
                return $http({
                    method: 'POST',
                    url: '/'+A,
                    data: json,
                    headers: {'Content-Type':'application/json'},
                    withCredentials : true
                });
            },
            //one-to-one
            function(){
                return $http({
                    method: 'POST',
                    url: '/'+B,
                    data: json,
                    headers: {'Content-Type':'application/json'},
                    withCredentials : true
                }).then(function(response){
                    idB = factory.getIdFromHeaders(response.headers);
                    return factory.bind();
                });
            },
            function(){
                //one-to-many
                return $http({
                    method: 'POST',
                    url: '/'+B,
                    data: json,
                    headers: {'Content-Type':'application/json'},
                    withCredentials : true
                }).then(function(response){
                    idB = factory.getIdFromHeaders(response.headers);
                    return factory.bind();
                });
            },
            function(){
                //many-to-many
                return $http({
                    method: 'POST',
                    url: '/'+B,
                    data: json,
                    headers: {'Content-Type':'application/json'},
                    withCredentials : true
                }).then(function(response){
                    idB = factory.getIdFromHeaders(response.headers);
                    return factory.bind();
                });
            }
        );
    };

    factory.update = function(json){
        if(!idA){throw new CustomException("call withId() first")}
        return relationSelector(
            //one
            function(){
                return $http({
                    method: 'PATCH',
                    url: '/'+A+'/'+idA,
                    data: json,
                    headers: {'Content-Type':'application/json'},
                    withCredentials : true
                });
            },
            //one-to-one
            function(){
                throw new CustomException("use one() for element from the toOne side");
            },
            //one-to-many
            function(){
                throw new CustomException("use one() for each element from the MANY side");
            },
            //many-to-many
            function(){
                throw new CustomException("use one() for each element from the MANY side");
            }
        );
    };

    factory.delete = function(){
        if(!idA){throw new CustomException("call withId() first")}
        return relationSelector(
            //one
            function(){
                return $http({
                    method: 'DELETE',
                    url: '/'+A+'/'+idA,
                    withCredentials : true
                });
            },
            //one-to-one
            function(){
                if((!idA||!idB) && (A != B)){throw new CustomException("call withId() for both entities first");}
                return factory.unbind().then(function(response){
                    return $http({
                       method: 'DELETE',
                       url: '/'+B+'/'+idB,
                       withCredentials : true
                    });
                });
            },
            //one-to-many
            function(){
                if((!idA||!idB) && (A != B)){throw new CustomException("call withId() for both entities first");}
                return factory.unbind().then(function(response){
                    return $http({
                       method: 'DELETE',
                       url: '/'+B+'/'+idB,
                       withCredentials : true
                    });
                });
            },
            //many-to-many
            function(){
                if((!idA||!idB) && (A != B)){throw new CustomException("call withId() for both entities first");}
                return factory.unbind().then(function(response){
                    return $http({
                       method: 'DELETE',
                       url: '/'+B+'/'+idB,
                       withCredentials : true
                    });
                });
                //throw new CustomException("use one() for each element from the MANY side");
            }
        );
    };

    factory.bind = function(){
        if((!idA||!idB) && (A != B)){throw new CustomException("call withId() for both entities first");}
        return relationSelector(
            //one
            function(){
                throw new CustomException("we need two entities to bind, this is not the Function you're looking for :)");
            },
            //one-to-one
            function(){
                return $q.all([
                    //bind B to -> A
                    $http({
                        method: 'PUT',
                        url: '/'+A+'/'+idA+'/'+getReferenceNameB(),
                        data: '/'+B+'/'+idB,
                        headers: {'Content-Type':'text/uri-list'},
                        withCredentials : true
                    }),
                    //bind A to -> B
                    $http({
                        method: 'PUT',
                        url: '/'+B+'/'+idB+'/'+getReferenceNameA(),
                        data: '/'+A+'/'+idA,
                        headers: {'Content-Type':'text/uri-list'},
                        withCredentials : true
                    })
                ]);
            },
            //one-to-many
            function(){
                return $q.all([
                    //bind B to -> A
                    $http({
                        method: 'PATCH',
                        url: '/'+A+'/'+idA+'/'+getReferenceNameB(),
                        data: '/'+B+'/'+idB,
                        headers: {'Content-Type':'text/uri-list'},
                        withCredentials : true
                    }),
                    //bind A to -> B
                    $http({
                        method: 'PUT',
                        url: '/'+B+'/'+idB+'/'+getReferenceNameA(),
                        data: '/'+A+'/'+idA,
                        headers: {'Content-Type':'text/uri-list'},
                        withCredentials : true
                    })
                ]);
            },
            //many-to-many
            function(){
                return $q.all([
                    //bind B to -> A
                    $http({
                        method: 'PATCH',
                        url: '/'+A+'/'+idA+'/'+getReferenceNameB(),
                        data: '/'+B+'/'+idB,
                        headers: {'Content-Type':'text/uri-list'},
                        withCredentials : true
                    }),
                    //bind A to -> B
                    $http({
                        method: 'PATCH',
                        url: '/'+B+'/'+idB+'/'+getReferenceNameA(),
                        data: '/'+A+'/'+idA,
                        headers: {'Content-Type':'text/uri-list'},
                        withCredentials : true
                    })
                ]);
            }
        );
    };

    factory.unbind = function(){
    //one, one_to_one, one_to_many, many_to_many
        if((!idA||!idB) && (A != B)){throw new CustomException("call withId() for both entities first");}
        return relationSelector(
            //one
            function(){
                throw new CustomException("we need two entities to unbind, this is not the Function you're looking for :)");
            },
            //one-to-one
            function(){
                return $q.all([
                    //unbind A from B
                    $http({
                       method: 'DELETE',
                       url: '/'+B+'/'+idB+'/'+getReferenceNameA(),
                       headers: {'Content-Type':'application/json'},
                       withCredentials : true
                    }),
                    //unbind B from A
                    $http({
                       method: 'DELETE',
                       url: '/'+A+'/'+idA+'/'+getReferenceNameB(),
                       headers: {'Content-Type':'application/json'},
                       withCredentials : true
                    })
                ]);
            },
            //one-to-many
            function(){
                return $q.all([
                    //unbind A from B
                    $http({
                       method: 'DELETE',
                       url: '/'+B+'/'+idB+'/'+getReferenceNameA(),
                       headers: {'Content-Type':'application/json'},
                       withCredentials : true
                    }),
                    //unbind B from A
                    $http({
                       method: 'DELETE',
                       url: '/'+A+'/'+idA+'/'+getReferenceNameB()+'/'+idB,
                       headers: {'Content-Type':'application/json'},
                       withCredentials : true
                    })
                ]);
            },
            //many-to-many
            function(){
                return $q.all([
                    //unbind A from B
                    $http({
                       method: 'DELETE',
                       url: '/'+B+'/'+idB+'/'+getReferenceNameA()+'/'+idA,
                       headers: {'Content-Type':'application/json'},
                       withCredentials : true
                    }),
                    //unbind B from A
                    $http({
                       method: 'DELETE',
                       url: '/'+A+'/'+idA+'/'+getReferenceNameB()+'/'+idB,
                       headers: {'Content-Type':'application/json'},
                       withCredentials : true
                    })
                ]);
            }
        );
    };

    //AngularJS will return a singleton for this factory
    //So if you want a clone...
    factory.clone = function() {
        init();
        var target = {};
        for (var i in factory) {
            if (factory.hasOwnProperty(i)) {
                target[i] = factory[i];
            }
        }
        return target;
    };

    init();
    return factory;
});

//util
function capitaliseFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}


