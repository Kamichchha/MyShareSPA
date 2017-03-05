var mongoose=require('mongoose');
var crypto=require("crypto");
var jsonwebtoken=require("jsonwebtoken");

var userSchema=new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    name:{type:String,required:true},
    salt:{type:String},
    hashedPassword:{type:String},
    isAdmin:{type:Boolean,default:false},
    createdOn:{type:Date,"default":Date.now}
});

userSchema.methods.setPassword=function(password){
    this.salt=crypto.randomBytes(16).toString('hex');
    this.hashedPassword=crypto.pbkdf2Sync(password,this.salt,1000,64).toString('hex');    
};

userSchema.methods.validPassword=function(password){
    var hash=crypto.pbkdf2Sync(password,this.salt,1000,64).toString('hex');
    return this.hashedPassword===hash;
};

userSchema.methods.generateJwt=function(){
    var expiry=new Date();
    expiry.setDate(expiry.getDate()+2);

    return jsonwebtoken.sign({
        id:this._id,
        name:this.name,
        email:this.email,
        isAdmin:this.isAdmin,        
        exp:parseInt(expiry.getTime()/1000)
        },process.env.JWT_SECRET);
};

mongoose.model('User',userSchema,'Users');