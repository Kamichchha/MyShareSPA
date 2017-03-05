(function(){
    var navigation=function(){
        return {
            restrict:'EA',
            templateUrl:'/common/directives/myShareNavigation.html',
            controller:'navigationCtrl as navvm'
        };
    };

    angular.module("myShareApp")
            .directive("navigation",navigation);

})();