const express = require('express');
const { getEmployeers, getEmployeerById, createEmployeer, deleteEmployeerById, updateemployeer } = require('../controllers/employeerController');

const router = express.Router();

// Çalýþanlarý listele
router.get('/employeers', getEmployeers);

// Belirli bir çalýþaný ID ile getir
router.get('/employeers/:id', getEmployeerById);

// Yeni çalýþan ekle
router.post('/Addemployeers', createEmployeer);

router.post('/DeleteEmployeer/:id', deleteEmployeerById)

router.post('/updateemployeer/:id', updateemployeer)


module.exports = router;
