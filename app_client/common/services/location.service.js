(function(){
var getLocationService=function(){
    var getLocData=function(cbSuccess,cbError,cbNoGeo){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(cbSuccess,cbError);
        }
        else{
            cbNoGeo();
        }
    }
    return {
        getLocData:getLocData
    };
}

angular.module("myShareApp")
        .service('getLocationService',getLocationService);
})();