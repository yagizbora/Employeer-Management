const express = require('express');
const router = express.Router();
const { getOrders } = require('../controllers/orderController');

// Listeleme API'si
router.get('/orders', getOrders);

module.exports = router;