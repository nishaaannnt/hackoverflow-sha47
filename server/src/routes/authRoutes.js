const express=require('express');
const userAuthController = require('../controllers/userAuthController')
const policeAuthController = require('../controllers/policeAuthController')
const router=express.Router();

router.post('/v2/user/login',userAuthController.login);
router.get('/v2/user/login',userAuthController.user);
router.post('/v2/user/signup',userAuthController.signup);

router.post('/v2/police/login',policeAuthController.login);
router.get('/v2/police/login',policeAuthController.user);
router.post('/v2/police/signup',policeAuthController.signup);

module.exports= router;


