(function(){
    addStockCtrl.$inject=["stockService","$uibModalInstance","descriptions"];
    function addStockCtrl(stockService,$uibModalInstance,descriptions){
        var vm=this;
        vm.descriptions=descriptions;
        
         vm.addStock=function(){
            vm.error="";

            vm.stockData={
                stockName:vm.stockName,
                stockCode:vm.stockCode,
                volume:vm.volume,
                currPrice:vm.currPrice,
                wkHigh52:vm.wk52High,
                wkLow52:vm.wk52Low
            };
            vm.stockData.category=[];
            if(vm.industry!==null){
                 vm.stockData.category.push(vm.industry);
            }
            if(vm.sector!==null){
                 vm.stockData.category.push(vm.sector);
            }
            stockService.addStock(vm.stockData).success(function(data){
                $uibModalInstance.close(data);
                return false;
            })
            .error(function(e){
                vm.error="Error saving stock, please try again";
                return false;
            });
            
            
        };

         vm.onCancel=function(){
                $uibModalInstance.dismiss('cancel');
            };
    };

    angular.module("myShareApp")
        .controller("addStockCtrl",addStockCtrl);

})();