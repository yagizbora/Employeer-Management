const express = require('express');
const { getEmployeers, getEmployeerById, createEmployeer, deleteEmployeerById, updateemployeer, getEmployeersByDepartmantId } = require('../controllers/employeerController');

const router = express.Router();

// �al��anlar� listele
router.get('/employeers', getEmployeers);

// Belirli bir �al��an� ID ile getir
router.get('/employeers/:id', getEmployeerById);

// Yeni �al��an ekle
router.post('/Addemployeers', createEmployeer);

router.post('/DeleteEmployeer/:id', deleteEmployeerById)

router.post('/updateemployeer/:id', updateemployeer)

router.get('/getEmployeersByDepartmantId/:id', getEmployeersByDepartmantId)


module.exports = router;
