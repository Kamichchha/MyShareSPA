(function(){
 stockListCtrl.$inject=["$scope","stockService","getLocationService","$uibModal","authentication"];   
function stockListCtrl($scope,stockService,getLocationService,$uibModal,authentication){
    stockListVM=this;
    stockListVM.message="Loading stocks list";
    //stockListVM.locMessage="Fetching your location...";
    stockListVM.pageHeader={
        title:'MyShare',
        strapLine:'    Ideas that can change your life...'
    };

    stockListVM.isLoggedIn=authentication.isLoggedIn();
    
    stockListVM.loadData=function(){
        stockService.getData().then(function(data){
        stockListVM.stockList=data.data;      
        stockListVM.message=data.data.length > 0? "":"No stocks found.";
        },function(e){
            stockListVM.message="Something went wrong!!!";
        });
    };

    stockListVM.loadData();

    //getLocationService.getLocData(stockListVM.loadLocation,stockListVM.errorLocation,stockListVM.noLocation);

    stockListVM.addStockForm=function(){
        var modalInstance=$uibModal.open({
            templateUrl:'stock/add-stock.modal.html',
            controller:'addStockCtrl',
            controllerAs:'vm',
            size:'lg'
        });

        modalInstance.result.then(function(data){
           stockListVM.stockList.push(data);
        });
    };

    stockListVM.updateStockForm=function(stockId){
        
        var modalInstance=$uibModal.open({
            templateUrl:'stock/update-stock.modal.html',
            controller:'updateStockCtrl',
            controllerAs:'vm',
            size:'lg',
            resolve:{
                updateData:function(){
                    return {
                        stockId:stockId
                    }
                }
            }
        });

        modalInstance.result.then(function(data){
            stockListVM.loadData();
        });
    };

    stockListVM.deleteStock=function(stockId){
        stockService.deleteStock(stockId).success(function(){
           stockListVM.loadData();
        }).error(function(e){
            console.log(e);
        });
    }

    
    stockListVM.loadLocation=function(position){
        $scope.$apply(function(){
             stockListVM.locMessage="You'r at : " + position.coords.latitude +" ," +position.coords.longitude;             
        });
    }
    stockListVM.errorLocation=function(error){
            $scope.$apply(function(){
             stockListVM.locMessage="";
        });
    }
    stockListVM.noLocation=function(){
        $scope.$apply(function(){
            stockListVM.locMessage="Browser doesn't support geolocation";             
        });
    }

};

angular.module("myShareApp")
        .controller("stockListCtrl",stockListCtrl);
})();