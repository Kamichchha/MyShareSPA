(function(){
    FeedbackService.$inject=["$resource"];
    function FeedbackService($resource){
        return $resource('/api/feedback/:feedBackId',{feedBackId:'@_id'},{
                update:{
                        method:'PUT'
                }
        });
};

angular.module("myShareApp")
        .factory('FeedbackService',FeedbackService);
})();