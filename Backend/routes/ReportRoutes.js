const express = require('express');
const router = express.Router();
const { SalaryAverageAndAllinDepartmans } = require('../controllers/ReportController');

router.get('/SalaryAverageAndAllinDepartmans', SalaryAverageAndAllinDepartmans);

module.exports = router;