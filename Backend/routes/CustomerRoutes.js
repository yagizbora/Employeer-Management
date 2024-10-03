const express = require('express');
const { getcustomer, addcustomer, getcustomerbyid, deletecustomerbyid, updatecustomerbyid, getallcustomer } = require('../controllers/CustomerController')

const router = express.Router();


router.post('/getcustomer', getcustomer)

router.get('/getallcustomer', getallcustomer)

router.post('/addcustomer', addcustomer)

router.post('/deletecustomerbyid', deletecustomerbyid)

router.post('/updatecustomerbyid', updatecustomerbyid)

router.get('/getcustomerbyid', getcustomerbyid)

module.exports = router;