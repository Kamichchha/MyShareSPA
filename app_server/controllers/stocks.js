module.exports.stocks= function(req, res, next) {
  res.render('stocks-list', stockListModel);
};

module.exports.stock= function(req, res, next) {
  res.render('stock-info', stockInfoModel);
};

module.exports.addReview= function(req, res, next) {
  res.render('stock-review', addReviewModel);
};

var stockListModel={
  title:'MyShare',
  pageHeader:{
    title:'MyShare',
    strapLine:' - Ideas that can change your life.'
  },
  stocks:[
    {
      name:"Infosys Technologies",
      WkHigh52:"1150",
      WkLow52:"900",
      LTP:932,
      Volume:235235,
      categories:['Information Tech.','Large Cap']
    },
    {
      name:"MOIL",
      WkHigh52:"432",
      WkLow52:"275",
      LTP:357,
      Volume:14551,
      categories:['Metal','Large Cap']
    },
    {
      name:"PNB Gilts",
      WkHigh52:"60",
      WkLow52:"23",
      LTP:59.5,
      Volume:154515,
      categories:['Banking','Small Cap']
    },
    {
      name:"BSE",
      WkHigh52:"1200",
      WkLow52:"1070",
      LTP:1088,
      Volume:15418841,
      categories:['Exchange','Large Cap']
    },
    {
      name:"Divis Labs",
      WkHigh52:"1310",
      WkLow52:"656",
      LTP:758,
      Volume:54154454,
      categories:['Pharma','Large Cap']
    }
  ]

};

var stockInfoModel={  
      name:"Infosys Technologies",
      WkHigh52:"1150",
      WkLow52:"900",
      LTP:932,
      Volume:235235,
      categories:['Information Tech.','Large Cap'],
      reviews:[{
        author:'Kamichchha singh',
        timestamp:'16-Aug-2016',
        comment:'Good stock to buy at this level.'
      },{
        author:'Kamichchha singh',
        timestamp:'31-Dec-2016',
        comment:'Buy at low levels.'
      },{
        author:'Kamichchha singh',
        timestamp:'16-Jan-2017',
        comment:'The stock will reach 1070.'
      }]  
};

var addReviewModel={
  title:'Add Review Page'
};