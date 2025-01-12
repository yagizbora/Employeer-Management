const express = require( 'express' );
const router = express.Router();

const {listallhistory,listallhistorybyid,deletehistorybyid,createhistory,updatehistorybyid } = require( '../controllers/CommunactionHistoryController' );


router.get('/listallcommunicationhistory',listallhistory);

router.get('/listallcommunicationhistorybyid',listallhistorybyid);

router.post('/createhistory',createhistory);

router.post('/deletehistorybyid',deletehistorybyid);

router.post('/updatehistorybyid',updatehistorybyid);

module.exports = router;