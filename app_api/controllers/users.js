var mongoose=require('mongoose');
var UserModel=mongoose.model('User');
var passport=require('passport');

//This file is used to manage users.

module.exports.register=function(req,res,next){
    if((!(req.body.email))||(!(req.body.name))||(!(req.body.password))){
        sendResponse(res,400,{"message":"All fields needed, try again."});
        return;
    }
    var user=new UserModel();
    user.email=req.body.email;
    user.name=req.body.name;
    // user.isAdmin=true;
    
    
    user.setPassword(req.body.password);
    
    user.save(user,function(err,user){
        var message=err.message;
        if(err){
            if(err.name==='ValidationError'){
                    message="Email should be in correct format";
             }
                //else vm.error=err.message.message;
             sendResponse(res,400,{"message":message});
        }
        else{
            var token=user.generateJwt();
            sendResponse(res,200,{"token":token});
        }
    });

};


module.exports.authenticateUser=function(req,res,next){
    
    if((!(req.body.email))||(!(req.body.password))){
        sendResponse(res,400,{"message":"All fields needed, try again."});
    }
    passport.authenticate('local',function(err,user,info){
        if(err){
            sendResponse(res,400,{"message":err});
        }

        if(user){
            var token=user.generateJwt();
            sendResponse(res,200,{"token":token});
        }
        else{
            sendResponse(res,401,{"message":info});
        }

    })(req,res);
};

var sendResponse=function(res,statusCode,data){
    res.status(statusCode);
    res.json(data);
}
