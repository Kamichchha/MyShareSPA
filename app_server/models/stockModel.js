var mongoose=require('mongoose');

var reviewSchema=new mongoose.Schema({
    author:{type:String,required:true},
    comment:String,
    createdOn:{type:Date,"default":Date.now}
});

var stockSchema= new mongoose.Schema({
    stockName:{type:String,required:true},
    stockCode:{type:String,required:true},
    currPrice:{type:Number,min:0},
    wkHigh52:{type:Number,min:0},
    wkLow52:{type:Number,min:0},
    volume:Number,
    category:[String],
    reviews:[reviewSchema]
});

mongoose.model('Stock',stockSchema,'Stocks');