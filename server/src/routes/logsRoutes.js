const express=require('express');
const logsController=require('../controllers/logsController')
const router=express.Router();

router.post('/',logsController.postLogs);
router.get('/all',logsController.getAllLogs);
router.get('/:userid',logsController.getLogsByUser);


module.exports= router;


