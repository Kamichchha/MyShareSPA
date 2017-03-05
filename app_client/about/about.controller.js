(function(){
 
function aboutCtrl(){
    vm=this;

    vm.pageHeader={
        title:'About Us'
    };

    vm.content={
         data:'    Ideas that can change your life...'
    };
   
};

angular.module("myShareApp")
        .controller("aboutCtrl",aboutCtrl);
})();