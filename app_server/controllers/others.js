module.exports.about= function(req, res, next) {
  res.render('about', aboutModel);
};

var aboutModel={
  title:'About Page',
  data:'This is about page content.'
};

module.exports.angularHome= function(req, res, next) {
  res.render('layout', {});
};




