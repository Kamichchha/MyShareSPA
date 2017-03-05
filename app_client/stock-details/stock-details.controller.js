(function(){
 
 stockDetailsCtrl.$inject=["stockService","$uibModal","$routeParams","authentication"];
function stockDetailsCtrl(stockService,$uibModal,$routeParams,authentication){
    vm=this;
    vm.stockId=$routeParams.stockId;

    vm.pageHeader={
        title:'Stock details: '
    };

     vm.isLoggedIn=authentication.isLoggedIn();

    stockService.getStockById(vm.stockId).success(function(data){
        vm.stock=data;
        vm.pageHeader.strapLine=stock.stockName;
    })
    .error(function(e){
        console.log(e);
    });

    vm.popUpReviewForm=function(){
        var modalInstance=$uibModal.open({
            templateUrl:'review/add-review.modal.html',
            controller:'addReviewModalCtrl',
            controllerAs:'vm',
            resolve:{
                stockData:function(){
                    return {
                        stockId:vm.stockId,
                        stockName:vm.stock.stockName
                    }
                }
            }
        });

        modalInstance.result.then(function(data){
           vm.stock.reviews.push(data);

        });
    };

    vm.content={
        title:'About Us',
        data:'    Ideas that can change your life...'
    };
};

angular.module("myShareApp")
        .controller("stockDetailsCtrl",stockDetailsCtrl);
})();