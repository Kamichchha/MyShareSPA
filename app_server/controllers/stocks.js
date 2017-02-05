module.exports.stocks= function(req, res, next) {
  res.render('stocks-list', { title: 'Stocks List Page' });
};

module.exports.stock= function(req, res, next) {
  res.render('stock-info', { title: 'Stock Detail Page' });
};

module.exports.addReview= function(req, res, next) {
  res.render('stock-review', { title: 'Add Review Page' });
};