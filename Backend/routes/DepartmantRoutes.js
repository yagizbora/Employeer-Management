const express = require('express');
const router = express.Router();

const { getdepartmants, getdepartmantById, deleteDepartmantById, createDepartmant, updatedepartmantbyId } = require('../controllers/DepartmantControler');


router.get('/departmants', getdepartmants);

router.get('/departmants/:id', getdepartmantById);

router.post('/DeleteDepartmant/:id', deleteDepartmantById);

router.post('/createDepartmant', createDepartmant);

router.post('/updatedepartmant', updatedepartmantbyId)


module.exports = router;