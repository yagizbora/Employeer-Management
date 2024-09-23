const express = require('express');
const router = express.Router();

const { getneed, createneed, getPriority, getneedbyid, deleteneedbyid, updateneedbyid } = require('../controllers/NeedController');

router.get('/getneed', getneed)

router.get('/getneedbyid', getneedbyid)

router.get('/getPriority', getPriority)

router.post('/createneed', createneed)

router.post('/deleteneedbyid', deleteneedbyid)

router.post('/updateneedbyid', updateneedbyid)

module.exports = router;