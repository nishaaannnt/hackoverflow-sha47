const express=require('express');
const router=express.Router();
const objectController=require('../controllers/objectController')

router.get('/all',objectController.getAllVideos);
router.post('/:userid/object',objectController.getObjectTimestamp);

module.exports=router;