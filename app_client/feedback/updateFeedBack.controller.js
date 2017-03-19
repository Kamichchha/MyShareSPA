(function(){
    updateFeedBackCtrl.$inject=["FeedbackService","$uibModalInstance","updateFeedback"];
    function updateFeedBackCtrl(FeedbackService,$uibModalInstance,updateFeedback){
        var vm=this;
        vm.feedBackId=updateFeedback.feedBackId;
       
        var feedback=FeedbackService.get({feedBackId:vm.feedBackId},function(){
            vm.feedback=feedback;
        });
        
         vm.updateItem=function(){
            vm.error="";
           
            feedback.headline=vm.feedback.headline;
            feedback.description=vm.feedback.description;
            feedback.status=vm.feedback.status;
            
            feedback.$update(function(){
                    $uibModalInstance.close();
                    return false;
            });
         };

         vm.onCancel=function(){
                $uibModalInstance.dismiss('cancel');
            };
    };

    angular.module("myShareApp")
        .controller("updateFeedBackCtrl",updateFeedBackCtrl);

})();