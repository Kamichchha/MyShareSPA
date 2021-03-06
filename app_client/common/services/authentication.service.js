(function(){
    authentication.$inject=['$window','$http'];
    function authentication($window,$http){
        var saveToken=function(token){
            $window.localStorage['authToken']=token;
        };

        var getToken=function(){
            return $window.localStorage['authToken'];
        };

        var login=function(user){
            return $http.post('/api/login',user).success(function(data){
                saveToken(data.token);
            });
        };

        var register=function(user){
            return $http.post('/api/register',user).success(function(data){
                
                saveToken(data.token);
            });
        };

        var logout=function(){
            $window.localStorage.removeItem('authToken');
        };

        var isLoggedIn=function(){
            var token=getToken();
            if(token){
                var payload=JSON.parse($window.atob(token.split('.')[1]));
                return payload.exp>Date.now()/1000;
            }
            else return false;
        };

        var currentUser=function(){
            if(isLoggedIn()){
                var token=this.getToken();                
                var payload=JSON.parse($window.atob(token.split('.')[1]));
                return {
                    name:payload.name,
                    email:payload.email
                };
            }
            
        };

        return {
            getToken:getToken,
            saveToken:saveToken,
            login:login,
            logout:logout,
            currentUser:currentUser,
            isLoggedIn:isLoggedIn,
            register:register
        };

    }

    angular.module("myShareApp")
            .factory("authentication",authentication);

})();