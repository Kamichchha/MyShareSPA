(function(){

var descriptions={
       "sectors":['Automobiles','Banking','Capital Goods','Finance','Infrastructure','IT Sector','Mining','Pharmaceuticals','Textiles'],
        "industries":['Large-cap','Mid-cap','Small-cap']
    
};

angular.module("myShareApp")
       .value('descriptions',descriptions);

})();