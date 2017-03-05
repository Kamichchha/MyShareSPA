var mongoose=require('mongoose');
var StockModel=mongoose.model('Stock');

//This file is used to manage CRUD operations on stocks.
module.exports.stockList=function(req,res,next){
    StockModel.find().select("-reviews").exec(function(err,stockList){
        if(err){
            sendResponse(res,404,{"message":err});
            return;
        }
        sendResponse(res,200,stockList);
    });
};

module.exports.addStock=function(req,res,next){
    var stock={
        stockName:req.body.stockName,
        stockCode:req.body.stockCode,
        currPrice:req.body.currPrice,
        wkHigh52:req.body.wkHigh52,
        wkLow52:req.body.wkLow52,
        volume:req.body.volume,
        category:req.body.category,
        reviews:[]
    };
    
    StockModel.create(stock,function(err,stock){
        if(err){
            sendResponse(res,404,{"message":err});
            return;
        }
        sendResponse(res,201,stock);
    });
    
};

module.exports.readStockOne=function(req,res,next){
    if(req.params && req.params.stockId){
        StockModel.findById(req.params.stockId).exec(function(err,stock){
            if (!(stock)){
                sendResponse(res,404,{"message":"Stock not found"});
                return;
            }
            if(err){
                sendResponse(res,404,err);
                return;
            }
            sendResponse(res,200,stock);
            return;
        });
    }
    else{
        sendResponse(res,404,{"message":"Stock Id is required"});
    }    
};

module.exports.updateStockOne=function(req,res,next){
    if(req.params && req.params.stockId){
        StockModel.findById(req.params.stockId).select("-reviews").exec(function(err,stock){
            if (!(stock)){
                sendResponse(res,404,{"message":"Stock not found"});
                return;
            }
            if(err){
                sendResponse(res,404,{"message":err});
                return;
            }
            stock.stockName=req.body.stockName;
            stock.stockCode=req.body.stockCode;
            stock.currPrice=req.body.currPrice;
            stock.wkHigh52=req.body.wkHigh52;
            stock.wkLow52=req.body.wkLow52;
            stock.volume=req.body.volume;
            stock.category=req.body.category;
            
            stock.save(function(err,stock){
                if(err){
                    sendResponse(res,404,{"message":err});
                    return;
                }
                sendResponse(res,200,stock);
            });
        
        });
    }
    else{
        sendResponse(res,404,{"message":"Stock Id is required"});
    }
};

module.exports.deleteStockOne=function(req,res,next){
    if(req.params && req.params.stockId){
        StockModel.findByIdAndRemove(req.params.stockId).exec(function(err,stock){
            if(err){
                sendResponse(res,404,{"message":err});
                return;
            }
            sendResponse(res,204,null);
            return;
        });
    }
    else{
        sendResponse(res,404,{"message":"Stock Id is required"});
    }
};

var sendResponse=function(res,statusCode,data){
    res.status(statusCode);
    res.json(data);
}

