var mongoose=require('mongoose');

var feedbackSchema=new mongoose.Schema({
    headline:{type:String,required:true},
    description:{type:String},
    status:{type:String},
    createdOn:{type:Date,"default":Date.now}
});

mongoose.model('FeedBack',feedbackSchema,'FeedBacks');