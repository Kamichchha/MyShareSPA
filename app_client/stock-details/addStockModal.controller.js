(function(){
    addStockCtrl.$inject=["stockService","$uibModalInstance"];
    function addStockCtrl(stockService,$uibModalInstance){
        var vm=this;
        
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
             vm.stockData.category.push(vm.industry);
             vm.stockData.category.push(vm.sector);
             
            stockService.addStock(vm.stockData).success(function(data){
                $uibModalInstance.close(data);
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