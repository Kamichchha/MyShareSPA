var express = require('express');
var router = express.Router();
var stockCtrl=require('../controllers/stocks');
var otherCtrl=require('../controllers/others');

/* GET home page. */
router.get('/', stockCtrl.stockList);
router.get('/addNewStock', stockCtrl.addStock);
router.post('/addNewStock', stockCtrl.doAddStock);

router.get('/stock/:stockId', stockCtrl.stockDetail);

router.get('/updateStock/:stockId', stockCtrl.stockUpdate);
router.post('/updateStock/:stockId', stockCtrl.doStockUpdate);

router.get('/deleteStock/:stockId', stockCtrl.deleteStock);

router.get('/stock/:stockId/addReview', stockCtrl.addReview);
router.post('/stock/:stockId/addReview', stockCtrl.doAddReview);

router.get('/about', otherCtrl.about);

module.exports = router;
