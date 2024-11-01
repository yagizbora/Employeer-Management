const express = require('express');
const router = express.Router();
const { login, register, listusers, deactiveusers, adminstatus, changepassword, changeusername, logout } = require('../controllers/UsersController')

router.post('/login',login)

router.post('/register', register)

router.post('/deactiveusers', deactiveusers)

router.post('/listusers', listusers)

router.post('/adminstatus', adminstatus)

router.post('/logout', logout)

router.post('/changepassword', changepassword)

router.post('/changeusername', changeusername)

module.exports = router;
