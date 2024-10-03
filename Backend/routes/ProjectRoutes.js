const express = require('express');

const { getprojects, getprojectsbyid, deleteprojectsbyid } = require('../controllers/ProjectController')


const router = express.Router();


router.get('/getprojects', getprojects)

router.get('/getprojectsbyid', getprojectsbyid)

router.post('/deleteprojectsbyid', deleteprojectsbyid)






module.exports = router;
