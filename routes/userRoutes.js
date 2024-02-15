const express = require('express');
const router = express.Router();
const {userRegApi} = require('../controller/userRegApi');
const {userLoginApi} = require('../controller/userLoginApi')
const {adminLogin} = require('../controller/adminLogin')
const {ContactController} = require("../controller/ContactController")
const {userForgotPasswordEmail,userForgotPasswordOtp,updatePassword} = require('../controller/userForgotPasswordController')
router.post('/registrations',userRegApi);
router.post('/login',userLoginApi)
router.post('/ForgotPasswordEmail',userForgotPasswordEmail)
router.post('/ForgotPasswordOtp',userForgotPasswordOtp)
router.post('/updatePassword',updatePassword)
router.post('/adminLogin',adminLogin);
router.post('/contact',ContactController)
module.exports = router;