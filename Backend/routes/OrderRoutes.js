const express = require('express');
const router = express.Router();
const { getOrders, getordersbyid, iscomplatedsetbyid, createorder } = require('../controllers/orderController');

// Listeleme API'si
router.post('/getorders', getOrders);

router.get('/getordersbyid', getordersbyid);

router.post('/iscomplatedsetbyid', iscomplatedsetbyid);

router.post('/createorder', createorder)

module.exports = router;