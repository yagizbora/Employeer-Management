const express = require('express');
const { getcustomer } = require('../controllers/CustomerController')

const router = express.Router();


router.get('/getcustomer', getcustomer)


module.exports = router;