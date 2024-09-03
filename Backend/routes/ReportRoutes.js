const express = require('express');
const router = express.Router();
const { SalaryAverageAndAllinDepartmans, getSalaryStatistics } = require('../controllers/ReportController');

router.get('/SalaryAverageAndAllinDepartmans', SalaryAverageAndAllinDepartmans);

router.get('/getSalaryStatistics', getSalaryStatistics)

module.exports = router;