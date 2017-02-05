var express = require('express');
var router = express.Router();
var stockCtrl=require('../controllers/stocks');
var otherCtrl=require('../controllers/others');

/* GET home page. */
router.get('/', stockCtrl.stocks);
router.get('/stock', stockCtrl.stock);
router.get('/stock/addReview', stockCtrl.addReview);

router.get('/about', otherCtrl.about);

module.exports = router;
