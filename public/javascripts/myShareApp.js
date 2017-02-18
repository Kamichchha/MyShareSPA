var stockListCtrl=function($scope,stockService,getLocationService){
    $scope.message="Loading Stocks. Please wait.....";
    $scope.locMessage="Checking your location";
    stockService.success(function(data){
        $scope.stockList=data;
        $scope.message=data.length > 0? "":"No stocks found.";
    })
    .error(function(e){
        console.log(e);
        $scope.message="Something went wrong!!!";
    });

    $scope.loadLocation=function(position){
        $scope.$apply(function(){
             $scope.locMessage="You'r at : " + position.coords.latitude +" ," +position.coords.longitude;             
        });
    }
    $scope.errorLocation=function(error){
            $scope.$apply(function(){
             $scope.locMessage="";
        });
    }
    var noLocation=function(){
        $scope.$apply(function(){
            $scope.locMessage="Browser doesn't support geolocation";             
        });
    }

    getLocationService.getLocData($scope.loadLocation,$scope.errorLocation,$scope.noLocation);
};

var formatVolume=function(){
    return function(value){
        var currValue=value.toString();
        if(currValue.length<=3){
            return value;
        }
        value=currValue.substring(0,currValue.length-3)+","+currValue.substring(currValue.length-3);
        return value;
    }
};

var stockService=function($http){
    return $http.get('/api/stock');
};

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

angular.module("myShareApp",[])
.controller("stockListCtrl",stockListCtrl)
.filter('formatVolume',formatVolume)
.service('stockService',stockService)
.service('getLocationService',getLocationService);



