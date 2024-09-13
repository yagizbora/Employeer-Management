const express = require('express');
const router = express.Router();

const { getnotes } = require('../controllers/NotesControllers');

router.get('/getnotes', getnotes)





module.exports = router;