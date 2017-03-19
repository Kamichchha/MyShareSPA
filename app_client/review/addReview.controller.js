(function(){
    addReviewModalCtrl.$inject=["$uibModalInstance","stockData","stockService","authentication"];
    function addReviewModalCtrl($uibModalInstance,stockData,stockService,authentication){
        var vm=this;
        vm.stockData=stockData;
        vm.formData={

        };

        vm.formData.name=authentication.currentUser().name;

         vm.onSubmit=function(){
                vm.formData.error="";
                if(!(vm.formData.name)||!(vm.formData.comment)){
                    vm.formData.error="All fields required, please try again";
                    return false;
                }
                else{
                    vm.saveData(vm.stockData.stockId,vm.formData);             
                    return false;
                }
                
            };
        vm.modal={
            cancel:function(){
                $uibModalInstance.dismiss('cancel');
            },
            close:function(data){
                $uibModalInstance.close(data);
            }          
        };

        vm.saveData=function(stockId,data){
            stockService.addReviewById(stockId,{"author":data.name,"comment":data.comment}).success(function(result){
                vm.modal.close(result);
            })
            .error(function(e){
                vm.formData.error="Error saving review, please try again";                   
            });
        };
    };

    angular.module("myShareApp")
        .controller("addReviewModalCtrl",addReviewModalCtrl);

})();