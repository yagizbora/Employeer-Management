const express = require('express');
const router = express.Router();

const { getneed, createneed, getPriority, getneedbyid } = require('../controllers/NeedController');

router.get('/getneed', getneed)

router.get('/getneedbyid', getneedbyid)

router.get('/getPriority', getPriority)

router.post('/createneed', createneed)

module.exports = router;