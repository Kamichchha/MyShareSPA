var express = require('express');
var router = express.Router();
var stockCtrl=require('../controllers/stocks');
var commentCtrl=require('../controllers/comments');

/* GET home page. */
router.get('/stock', stockCtrl.stockList);
router.post('/stock', stockCtrl.addStock);
router.get('/stock/:stockId', stockCtrl.readStockOne);
router.put('/stock/:stockId', stockCtrl.updateStockOne);
router.delete('/stock/:stockId', stockCtrl.deleteStockOne);

router.post('/stock/:stockId/comment', commentCtrl.addStockComment);
router.get('/stock/:stockId/comment/:commentId', commentCtrl.readStockCommentOne);
router.put('/stock/:stockId/comment/:commentId', commentCtrl.updateStockCommentOne);
router.delete('/stock/:stockId/comment/:commentId', commentCtrl.deleteStockCommentOne);

module.exports = router;
