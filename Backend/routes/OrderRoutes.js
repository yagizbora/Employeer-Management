const express = require('express');
const router = express.Router();
const { getOrders, getordersbyid, iscomplatedsetbyid, createorder, deleteorders, updateorderbyid } = require('../controllers/orderController');

// Listeleme API'si
router.post('/getorders', getOrders);

router.get('/getordersbyid', getordersbyid);

router.post('/iscomplatedsetbyid', iscomplatedsetbyid);

router.post('/deleteorders', deleteorders);

router.post('/createorder', createorder);

router.post('/updateorderbyid', updateorderbyid);

module.exports = router;