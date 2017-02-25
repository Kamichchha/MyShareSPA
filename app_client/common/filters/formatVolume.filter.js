(function(){
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

angular.module("myShareApp")
        .filter("formatVolume",formatVolume);

})();