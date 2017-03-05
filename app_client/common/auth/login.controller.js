(function(){

    loginCtrl.$inject=["authentication","$location"];
    function loginCtrl(authentication,$location){
        var vm=this;
        vm.credentials={
            email:"",
            password:""
        };
        vm.error="";

        vm.pageHeader={
            title:'Log In'
        };

        vm.returnPage=$location.search().page||'/';

        vm.loginUser=function(){
            vm.error="";
            if(!(vm.credentials.email)||!(vm.credentials.password)){
                vm.error="All fields required, try again.";
                return false;
            }
            var user={
                email:vm.credentials.email,
                password:vm.credentials.password
            };

            authentication.login(user).success(function(user){
                $location.search('page',null);
                $location.path(vm.returnPage);
            })
            .error(function(err){
                vm.error=err.message.message;                
            });

        };

    };

    angular.module("myShareApp")
            .controller("loginCtrl",loginCtrl);

})();