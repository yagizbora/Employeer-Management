const express = require('express');

const { getprojects, getprojectsbyid, deleteprojectsbyid, createprojects, updateprojects } = require('../controllers/ProjectController')


const router = express.Router();


router.get('/getprojects', getprojects)

router.get('/getprojectsbyid', getprojectsbyid)

router.post('/deleteprojectsbyid', deleteprojectsbyid)

router.post('/createprojects', createprojects)

router.post('/updateprojects', updateprojects)





module.exports = router;
