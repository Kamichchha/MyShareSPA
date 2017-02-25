(function(){
    var footerGeneric=function(){
        return {
            restrict:'EA',
            templateUrl:'/common/directives/footerGeneric.html'
        };
    };

    angular.module("myShareApp")
            .directive("footerGeneric",footerGeneric);

})();