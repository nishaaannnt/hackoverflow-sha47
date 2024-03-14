const express=require('express');
const router=express.Router();
const cameraController= require('../controllers/cameraController');

router.get('/all',cameraController.getAllCameras);
router.get('/user/:userid/camera',cameraController.getCameraById);
router.post('/user/nearbycamera',cameraController.getNearbyCameras);
router.post('/user/:userid/camera',cameraController.postCameraById);
router.delete('/camera/:cameraid',cameraController.deleteCameraById);
router.put('/camera/:cameraid',cameraController.updateCameraById);


module.exports=router;