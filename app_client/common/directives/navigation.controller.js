(function(){

    navigationCtrl.$inject=["authentication","$location"];
    function navigationCtrl(authentication,$location){
        var navvm=this;

        navvm.currentPath=$location.path();
        navvm.isLoggedIn=authentication.isLoggedIn();
        navvm.currentUser=authentication.currentUser();

       navvm.logOut=function(){
            authentication.logout();
            $location.path('/login');
        };
    };

    angular.module("myShareApp")
            .controller("navigationCtrl",navigationCtrl);

})();