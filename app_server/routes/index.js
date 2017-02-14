var express = require('express');
var router = express.Router();
var stockCtrl=require('../controllers/stocks');
var otherCtrl=require('../controllers/others');

/* GET home page. */
router.get('/', stockCtrl.stockList);
router.get('/stock/:stockId', stockCtrl.stockDetail);
router.get('/stock/:stockId/addReview', stockCtrl.addReview);
router.post('/stock/:stockId/addReview', stockCtrl.doAddReview);

router.get('/about', otherCtrl.about);

module.exports = router;
