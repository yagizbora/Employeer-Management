const express = require('express');
const router = express.Router();

const { getneed, createneed, getPriority } = require('../controllers/NeedController');

router.get('/getneed', getneed)

router.get('/getPriority', getPriority)

router.post('/createneed', createneed)

module.exports = router;