(function(){
    updateStockCtrl.$inject=["stockService","updateData","$uibModalInstance","descriptions"];
    function updateStockCtrl(stockService,updateData,$uibModalInstance,descriptions){
        var vm=this;
        vm.stockId=updateData.stockId;
        vm.descriptions=descriptions;

        stockService.getStockById(vm.stockId).success(function(data){
            vm.stockData=data;
            vm.stockData.industry=data.category[0];
            vm.stockData.sector=data.category[1];
        })
        .error(function(e){
            console.log(e);
        });

        vm.onUpdate=function(){
            vm.error="";
            vm.updatedData={
                stockName:vm.stockData.stockName,
                stockCode:vm.stockData.stockCode,
                volume:vm.stockData.volume,
                currPrice:vm.stockData.currPrice,
                wkHigh52:vm.stockData.wkHigh52,
                wkLow52:vm.stockData.wkLow52
            };
            vm.updatedData.category=[];
            vm.updatedData.category.push(vm.stockData.industry);
            vm.updatedData.category.push(vm.stockData.sector);
            
            stockService.updateStock(vm.stockId,vm.updatedData).success(function(data){
            // vm.error="Stock Updated successfully";
                $uibModalInstance.close(data);
                return false;
            })
            .error(function(e){
                vm.error="Error updating stock, please try again";
                return false;
            });
        
            
        };
        vm.onCancel=function(){
                $uibModalInstance.dismiss('cancel');
            };
    };

    angular.module("myShareApp")
        .controller("updateStockCtrl",updateStockCtrl);

})();