const express = require('express');
const router = express.Router();
const { login, register, listusers, deactiveusers } = require('../controllers/UsersController')

router.post('/login',login)

router.post('/register', register)

router.post('/deactiveusers', deactiveusers)

router.get('/listusers', listusers)

module.exports = router;
