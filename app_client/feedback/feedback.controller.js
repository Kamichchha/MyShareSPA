(function(){
 feedbackListCtrl.$inject=["$scope","FeedbackService","$uibModal"];   
function feedbackListCtrl($scope,FeedbackService,$uibModal){
    feedbackListVM=this;
    feedbackListVM.message="Loading Feedback list";
    
    feedbackListVM.pageHeader={
        title:'FeedBacks',
        strapLine:''
    };

    feedbackListVM.LoadData=function(){
        feedbackListVM.feedBackList=FeedbackService.query(function(){
            feedbackListVM.message="";
        });
    };

    feedbackListVM.LoadData();

    feedbackListVM.addFeedBackForm=function(){
        var modalInstance=$uibModal.open({
            templateUrl:'feedback/add-feedback.modal.html',
            controller:'addFeedBackCtrl',
            controllerAs:'vm',
            size:'lg'
        });

        modalInstance.result.then(function(data){
           feedbackListVM.feedBackList.push(data);
        });
    };

     feedbackListVM.updateFeedBackForm=function(feedBackId){
        var modalInstance=$uibModal.open({
            templateUrl:'feedback/update-feedback.modal.html',
            controller:'updateFeedBackCtrl',
            controllerAs:'vm',
            size:'lg',
            resolve:{
                updateFeedback:function(){
                    return {
                        feedBackId:feedBackId
                    }
                }
            }
        });

        modalInstance.result.then(function(){
           feedbackListVM.LoadData();
        });
    };    

    feedbackListVM.deleteFeedback=function(feedBackId){
        FeedbackService.remove({feedBackId:feedBackId},function(){
            feedbackListVM.LoadData();
        });
    };

    
};

angular.module("myShareApp")
        .controller("feedbackListCtrl",feedbackListCtrl);
})();