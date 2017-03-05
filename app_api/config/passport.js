var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;
var mongoose=require('mongoose');
var UserModel=mongoose.model('User');


passport.use(new LocalStrategy({
    usernameField:'email'
},function(username,password,done){
    
    UserModel.findOne({email:username},function(err,user){
        if(err){
            return done(err);
        }

        if(!(user)){
            return done(null,false,{"message":"Invalid user"});
        }

        if(!(user.validPassword(password))){
            return done(null,false,{"message":"Invalid password"});
        }

        return done(null,user);
        
    });

}));