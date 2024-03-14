const express=require('express');
const router=express.Router();
const cameraController= require('../controllers/cameraController');
const userController=require('../controllers/userController');

router.get('/all',userController.getAllUsers);
router.post('/:userid/cameras',cameraController.postCameraById);
router.get('/:userid',userController.getUserById);
router.get('/cam/:camid',userController.getUserByCamId);

module.exports=router;