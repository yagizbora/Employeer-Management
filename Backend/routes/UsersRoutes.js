const express = require('express');
const router = express.Router();
const ratelimiter = require('../Middleware/ratelimiter')
const
{
    login,
    register,
    listusers,
    deactiveusers,
    adminstatus,
    changepassword,
    changeusername,
    logout,
    firstregister,
    firstregistercontroller,
    changeemail,
    usersurnamechange,
    uploadprofilephoto,
    getemail,
    getprofilephoto,
    profilephoto,
    getalldatausers,
    logoutuserforsuperadmin
} = require('../controllers/UsersController')

router.post('/login', ratelimiter, login)

router.post('/uploadprofilephoto', uploadprofilephoto)

router.post('/logoutuserforsuperadmin', logoutuserforsuperadmin)

router.post('/profilephoto', profilephoto)

router.post('/usersurnamechange', usersurnamechange)

router.post('/register', register)

router.post('/deactiveusers', deactiveusers)

router.post('/listusers', listusers)

router.post('/adminstatus', adminstatus)

router.post('/logout', logout)

router.post('/changepassword', changepassword)

router.post('/changeusername', changeusername)

router.post('/firstregister', firstregister)

router.get('/firstregistercontroller', firstregistercontroller)

router.post('/changeemail', changeemail)

router.get('/getemail', getemail)

router.get('/getprofilephoto', getprofilephoto)

router.get('/getalldatausers', getalldatausers)

module.exports = router;
