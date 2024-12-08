const express = require('express');
const { getEmployeers, getEmployeerById, createEmployeer, deleteEmployeerById, updateemployeer, getEmployeersByDepartmantId, employeerfire } = require('../controllers/employeerController');

const router = express.Router();

    
router.get('/employeers', getEmployeers);


router.get('/employeers/:id', getEmployeerById);

router.post('/Addemployeers', createEmployeer);

router.post('/DeleteEmployeer/:id', deleteEmployeerById)

router.post('/updateemployeer/:id', updateemployeer)

router.post('/fireemployeer', employeerfire)

router.get('/getEmployeersByDepartmantId/:id', getEmployeersByDepartmantId)


module.exports = router;
