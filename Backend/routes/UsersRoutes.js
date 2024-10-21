const express = require('express');
const router = express.Router();
const { login, register, listusers, deactiveusers, adminstatus } = require('../controllers/UsersController')

router.post('/login',login)

router.post('/register', register)

router.post('/deactiveusers', deactiveusers)

router.get('/listusers', listusers)

router.post('/adminstatus', adminstatus)

module.exports = router;
