var mongoose=require('mongoose');
var FeedBackModel=mongoose.model('FeedBack');

//This file is used to manage CRUD operations on user feedback.
module.exports.feedBackList=function(req,res,next){
    FeedBackModel.find().exec(function(err,feedList){
        if(err){
            sendResponse(res,404,{"message":err});
            return;
        }
        sendResponse(res,200,feedList);
    });
};

module.exports.addFeedBack=function(req,res,next){
    var feedback={
        headline:req.body.headline,
        description:req.body.description,
        status:req.body.status
    };
    
    FeedBackModel.create(feedback,function(err,feedback){
        if(err){
            sendResponse(res,404,{"message":err});
            return;
        }
        sendResponse(res,201,feedback);
    });
    
};

module.exports.readFeedBackOne=function(req,res,next){
    if(req.params && req.params.feedBackId){
        FeedBackModel.findById(req.params.feedBackId).exec(function(err,feedBack){
            if (!(feedBack)){
                sendResponse(res,404,{"message":"Feedback not found"});
                return;
            }
            if(err){
                sendResponse(res,404,err);
                return;
            }
            sendResponse(res,200,feedBack);
            return;
        });
    }
    else{
        sendResponse(res,404,{"message":"FeedBack Id is required"});
    }    
};

module.exports.updateFeedBackOne=function(req,res,next){
    if(req.params && req.params.feedBackId){
        FeedBackModel.findById(req.params.feedBackId).exec(function(err,feedBack){
            if (!(feedBack)){
                sendResponse(res,404,{"message":"Feedback not found"});
                return;
            }
            if(err){
                sendResponse(res,404,{"message":err});
                return;
            }
            feedBack.headline=req.body.headline;
            feedBack.description=req.body.description;
            feedBack.status=req.body.status;
            
            feedBack.save(function(err,feedBack){
                if(err){
                    sendResponse(res,404,{"message":err});
                    return;
                }
                sendResponse(res,200,feedBack);
            });
        
        });
    }
    else{
        sendResponse(res,404,{"message":"FeedBack Id is required"});
    }
};

module.exports.deleteFeedBackOne=function(req,res,next){
    if(req.params && req.params.feedBackId){
        FeedBackModel.findByIdAndRemove(req.params.feedBackId).exec(function(err,feedBack){
            if(err){
                sendResponse(res,404,{"message":err});
                return;
            }
            sendResponse(res,204,null);
            return;
        });
    }
    else{
        sendResponse(res,404,{"message":"FeedBack Id is required"});
    }
};

var sendResponse=function(res,statusCode,data){
    res.status(statusCode);
    res.json(data);
}

