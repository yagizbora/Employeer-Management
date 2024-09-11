const express = require('express');

const { getcomplaints, createcomplaints, deletecomplaintsbyid, getcomplaintsbyid, updatecomplaintsbyid } = require('../controllers/ComplaintController.js');


const router = express.Router();

router.get('/getcomplaints', getcomplaints);

router.get('/getcomplaintsbyid', getcomplaintsbyid)

router.post('/createcomplaints', createcomplaints);

router.post('/deletecomplaintsbyid', deletecomplaintsbyid);

router.post('/updatecomplaintsbyid', updatecomplaintsbyid);

module.exports = router;