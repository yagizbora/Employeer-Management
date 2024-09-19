const express = require('express');
const router = express.Router();

const { getneed, creatneed } = require('../controllers/NeedController');

router.get('/getneed', getneed)

router.post('/createneed', creatneed)

module.exports = router;