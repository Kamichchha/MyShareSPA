(function(){

    registerCtrl.$inject=["authentication","$location"];
    function registerCtrl(authentication,$location){
        var vm=this;
        vm.credentials={
            name:"",
            email:"",
            password:""
        };

        vm.pageHeader={
            title:'Register User'
        };

        vm.returnPage=$location.search().page||'/';

        vm.addUser=function(){
            vm.error="";
            if(!(vm.credentials.name)||!(vm.credentials.email)||!(vm.credentials.password)){
                vm.error="All fields required, try again.";
                return false;
            }
            var user={
                name:vm.credentials.name,
                email:vm.credentials.email,
                password:vm.credentials.password
            };

            authentication.register(user).success(function(user){
                $location.search('page',null);
                $location.path(vm.returnPage);
            })
            .error(function(err){
                vm.error=err.message.message;
            });

        };

    };

    angular.module("myShareApp")
            .controller("registerCtrl",registerCtrl);

})();