const express = require('express');

const { getcomplaints, createcomplaints } = require('../controllers/ComplaintController.js');


const router = express.Router();

router.get('/getcomplaints', getcomplaints);

router.post('/createcomplaints', createcomplaints);


module.exports = router;