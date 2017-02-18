var request=require("request");

var apiOptions={
  server:"http://127.0.0.1:3000"
};

if(process.env.NODE_ENV==='production'){
  apiOptions.server="https://my-share.herokuapp.com";
}

module.exports.stockList= function(req, res, next) {
  var requestOptions={
    url:apiOptions.server+"/api/stock",
    method:"GET",
    json:{}
  };
  request(requestOptions,function(err,response,body){
    renderStockList(req,res,body);
  });  
};

module.exports.addStock=function(req,res,next){
  res.render('add-stock',{
     title:"Add New Stock",
     error:req.query.error
   }); 
};

module.exports.doAddStock=function(req,res,next){
  var data={
    stockName:req.body.name,
    stockCode:req.body.code,
    volume:req.body.volume,
    currPrice:req.body.currPrice,
    wkHigh52:req.body.wkHigh52,
    wkLow52:req.body.wkLow52,
    category:[]
  };

  data.category.push(req.body.industry);
  data.category.push(req.body.sector);

  var requestOptions={
    url:apiOptions.server+"/api/stock",
    method:"POST",
    json:data
  };

  if(!(data.stockName)||!(data.stockCode)){
    res.redirect(apiOptions.server+"/addNewStock/?error=val")
  }
  else {
    request(requestOptions,function(err,response,body){
      if(response.statusCode===201){
        res.redirect(apiOptions.server);
      }
      else if(response.statusCode===400 && body.name && body.name==="ValidationError"){
        res.redirect(apiOptions.server+"/addNewStock/?error=val")
      }
      else {
        console.log(response);
        _showError(req,res,response.statusCode);
      }
    });
  }
};

module.exports.stockDetail= function(req, res, next) {
 getLocationInfo(req,res,renderStockDetail); 
};

module.exports.addReview= function(req, res, next) {
  getLocationInfo(req,res,renderReviewPage);
};

module.exports.doAddReview=function(req,res,next){
  var data={
    author:req.body.name,
    comment:req.body.review
  };
  
  var requestOptions={
    url:apiOptions.server+"/api/stock/"+req.params.stockId+"/comment",
    method:"POST",
    json:data
  };

  if(!(data.author)||!(data.comment)){
    res.redirect(apiOptions.server+"/stock/"+req.params.stockId+"/addReview/?error=val")
  }
  else {
    request(requestOptions,function(err,response,body){
      if(response.statusCode===200){
        res.redirect(apiOptions.server+"/stock/"+req.params.stockId);
      }
      else if(response.statusCode===400 && body.name && body.name==="ValidationError"){
        res.redirect(apiOptions.server+"/stock/"+req.params.stockId+"/addReview/?error=val")
      }
      else {
        _showError(req,res,response.statusCode);
      }
    });
  }
};

module.exports.stockUpdate=function(req,res,next){
  getLocationInfo(req,res,renderStockUpdateForm); 
};

module.exports.deleteStock=function(req,res,next){
  var requestOptions={
    url:apiOptions.server+"/api/stock/"+req.params.stockId,
    method:"DELETE",
    json:{}
  };

  request(requestOptions,function(err,response,body){
      if(response.statusCode===204){
        res.redirect(apiOptions.server);
      }
      else {
        console.log(response);
        _showError(req,res,response.statusCode);
      }
    });

}
module.exports.doStockUpdate=function(req,res,next){
  var data={
    _id:req.body._id,
    stockName:req.body.stockName,
    stockCode:req.body.stockCode,
    volume:req.body.volume,
    currPrice:req.body.currPrice,
    wkHigh52:req.body.wkHigh52,
    wkLow52:req.body.wkLow52,
    category:[]
  };
  console.log(req.body);
  data.category.push(req.body.industry);
  data.category.push(req.body.sector);
  console.log(data);
  
  var requestOptions={
    url:apiOptions.server+"/api/stock/"+req.params.stockId,
    method:"PUT",
    json:data
  };

  if(!(data.stockName)||!(data.stockCode)){
    res.redirect(apiOptions.server+"/updateStock/"+req.params.stockId+"?error=val");
  }
  else {
    request(requestOptions,function(err,response,body){
      if(response.statusCode===200){
        res.redirect(apiOptions.server);
      }
      else if(response.statusCode===400 && body.name && body.name==="ValidationError"){
        res.redirect(apiOptions.server+"/updateStock/"+req.params.stockId+"?error=val")
      }
      else {
        console.log(response);
        _showError(req,res,response.statusCode);
      }
    });
  }
};

var renderStockDetail=function(req,res,body){
  res.render('stock-info', body);
};

var renderStockUpdateForm=function(req,res,body){
  var data={
    _id:body._id,
    stockName:body.stockName,
    stockCode:body.stockCode,
    volume:body.volume,
    currPrice:body.currPrice,
    wkHigh52:body.wkHigh52,
    wkLow52:body.wkLow52    ,
    industry:body.category[0],
    sector:body.category[1]
  };

console.log(data);
  res.render('stock-info-update', data); 
};

var renderStockList=function(req,res,body){
  var errorMessage;
  if(!(body instanceof Array)){
    errorMessage="Error receiving data from API";
    body=[];
  }
  else if(!(body.length)){
    errorMessage="No stocks found";
  }

  res.render('stocks-list', {
    title:'MyShare',
    pageHeader:{
      title:'MyShare',
      strapLine:' - Ideas that can change your life.'
    },
    stocks:body,
    error:errorMessage
  });
};

var renderReviewPage=function(req,res,body){
  console.log(req.query.error);
  res.render('stock-review', {
    title:body.stockName,
    error:req.query.error
  });
}

var getLocationInfo=function(req,res,callback){
  var requestOptions={
    url:apiOptions.server+"/api/stock/"+req.params.stockId,
    method:"GET",
    json:{}
  };
  request.get(requestOptions,function(err,response,body){
    if(response.statusCode===200){
      callback(req,res,body);
    }
    else _showError(req,res,response.statusCode);
  });
}
var _showError=function(req,res,status){
  var data={};
  if(status===404){
    data.title=status+' , Page not found';
    data.message="This page doesn't exists."
  }
  else{
    data.title=status+' , Something went wrong';
    data.message="Something went wrong."
  }
  res.render('generic-text',data);
}
