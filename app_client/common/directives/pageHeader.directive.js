(function(){
    var pageHeader=function(){
        return {
            restrict:'EA',
            scope:{
                content:'=content'
            },
            templateUrl:'/common/directives/pageHeader.html'
        };
    };

    angular.module("myShareApp")
            .directive("pageHeader",pageHeader);

})();