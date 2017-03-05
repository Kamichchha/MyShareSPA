var express = require('express');
var router = express.Router();
var stockCtrl=require('../controllers/stocks');
var commentCtrl=require('../controllers/comments');
var authUserCtrl=require('../controllers/users');
var jwt=require('express-jwt');

var auth=jwt({
    secret:process.env.JWT_SECRET,
    userProperty:'payload'
});

/* GET home page. */
router.get('/stock',stockCtrl.stockList);
router.post('/stock',auth,  stockCtrl.addStock);
router.get('/stock/:stockId', stockCtrl.readStockOne);
router.put('/stock/:stockId',auth,  stockCtrl.updateStockOne);
router.delete('/stock/:stockId',auth,  stockCtrl.deleteStockOne);

router.post('/stock/:stockId/comment', auth, commentCtrl.addStockComment);
router.get('/stock/:stockId/comment/:commentId', commentCtrl.readStockCommentOne);
router.put('/stock/:stockId/comment/:commentId', auth, commentCtrl.updateStockCommentOne);
router.delete('/stock/:stockId/comment/:commentId',auth,  commentCtrl.deleteStockCommentOne);

router.post('/register', authUserCtrl.register);
router.post('/login', authUserCtrl.authenticateUser);

module.exports = router;
