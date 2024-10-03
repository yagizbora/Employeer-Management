const express = require('express');
const { getcustomer, addcustomer, getcustomerbyid, deletecustomerbyid, updatecustomerbyid } = require('../controllers/CustomerController')

const router = express.Router();


router.post('/getcustomer', getcustomer)

router.post('/addcustomer', addcustomer)

router.post('/deletecustomerbyid', deletecustomerbyid)

router.post('/updatecustomerbyid', updatecustomerbyid)

router.get('/getcustomerbyid', getcustomerbyid)

module.exports = router;