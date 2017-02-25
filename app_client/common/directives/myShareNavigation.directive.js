(function(){
    var navigation=function(){
        return {
            restrict:'EA',
            templateUrl:'/common/directives/myShareNavigation.html'
        };
    };

    angular.module("myShareApp")
            .directive("navigation",navigation);

})();