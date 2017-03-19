(function(){
    addFeedBackCtrl.$inject=["FeedbackService","$uibModalInstance"];
    function addFeedBackCtrl(FeedbackService,$uibModalInstance){
        var vm=this;
        
         vm.addItem=function(){
            vm.error="";
             vm.feedback=new FeedbackService();

            vm.feedback={
                headline:vm.headline,
                description:vm.description,
                status:vm.status
            };

            FeedbackService.save(vm.feedback,function(data){
               $uibModalInstance.close(data);
               return false;
            });                
            
        };

         vm.onCancel=function(){
                $uibModalInstance.dismiss('cancel');
            };
    };

    angular.module("myShareApp")
        .controller("addFeedBackCtrl",addFeedBackCtrl);

})();