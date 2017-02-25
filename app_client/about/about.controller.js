(function(){
 
function aboutCtrl(){
    vm=this;

    vm.content={
        title:'About Us',
        data:'    Ideas that can change your life...'
    };
};

angular.module("myShareApp")
        .controller("aboutCtrl",aboutCtrl);
})();