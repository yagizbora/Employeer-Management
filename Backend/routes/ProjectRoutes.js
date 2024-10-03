const express = require('express');

const { getprojects, getprojectsbyid, deleteprojectsbyid, createprojects } = require('../controllers/ProjectController')


const router = express.Router();


router.get('/getprojects', getprojects)

router.get('/getprojectsbyid', getprojectsbyid)

router.post('/deleteprojectsbyid', deleteprojectsbyid)

router.post('/createprojects', createprojects)





module.exports = router;
