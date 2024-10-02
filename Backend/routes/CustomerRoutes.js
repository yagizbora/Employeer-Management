const express = require('express');
const { getcustomer, addcustomer, getcustomerbyid } = require('../controllers/CustomerController')

const router = express.Router();


router.get('/getcustomer', getcustomer)

router.post('/addcustomer', addcustomer)

router.get('/getcustomerbyid', getcustomerbyid)

module.exports = router;