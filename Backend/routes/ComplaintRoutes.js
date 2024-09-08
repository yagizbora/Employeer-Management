const express = require('express');

const { getcomplaints, createcomplaints, deletecomplaintsbyid } = require('../controllers/ComplaintController.js');


const router = express.Router();

router.get('/getcomplaints', getcomplaints);

router.post('/createcomplaints', createcomplaints);

router.post('/deletecomplaintsbyid', deletecomplaintsbyid);


module.exports = router;