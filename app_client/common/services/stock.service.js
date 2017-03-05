(function(){
    stockService.$inject=["$http","authentication"];
    function stockService($http,authentication){

        var getData=function(){
             return $http.get('/api/stock',{headers:{Authorization:'Bearer '+authentication.getToken()}});
        };

        var getStockById=function(stockId){
            return $http.get('/api/stock/'+stockId,{headers:{Authorization:'Bearer '+authentication.getToken()}});
        };

        var addReviewById=function(stockId,data){
            return $http.post('/api/stock/'+stockId+'/comment',data,{headers:{Authorization:'Bearer '+authentication.getToken()}});
        };

        var addStock=function(data){
            return $http.post('/api/stock',data,{headers:{Authorization:'Bearer '+authentication.getToken()}});
        }

        var updateStock=function(stockId,data){
            return $http.put('/api/stock/'+stockId,data,{headers:{Authorization:'Bearer '+authentication.getToken()}});
        }

        var deleteStock=function(stockId){
            return $http.delete('/api/stock/'+stockId,{headers:{Authorization:'Bearer '+authentication.getToken()}});
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