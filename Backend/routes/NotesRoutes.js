const express = require('express');
const router = express.Router();

const { getnotes, getnotesbyid, updatenotes, createnotes, deletenotes, notesimportant } = require('../controllers/NotesControllers');

router.get('/getnotes', getnotes)


router.get('/getnotesbyid', getnotesbyid)

router.get('/notesimportant', notesimportant)

router.post('/updatenotes', updatenotes)


router.post('/createnotes', createnotes)

router.post('/deletenotes', deletenotes)



module.exports = router;