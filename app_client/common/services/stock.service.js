(function(){
    stockService.$inject=["$http"];
    function stockService($http){

        var getData=function(){
             return $http.get('/api/stock');
        };

        var getStockById=function(stockId){
            return $http.get('/api/stock/'+stockId);
        };

        var addReviewById=function(stockId,data){
            return $http.post('/api/stock/'+stockId+'/comment',data);
        };

        var addStock=function(data){
            return $http.post('/api/stock',data);
        }

        var updateStock=function(stockId,data){
            return $http.put('/api/stock/'+stockId,data);
        }

        var deleteStock=function(stockId){
            return $http.delete('/api/stock/'+stockId);
        }

        return {
            getData:getData,
            getStockById:getStockById,
            addReviewById:addReviewById,
            addStock:addStock,
            updateStock:updateStock,
            deleteStock:deleteStock
        };
};

angular.module("myShareApp")
        .service('stockService',stockService);
})();