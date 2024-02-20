const express = require('express');
const router = express.Router();
const {userRegApi} = require('../controller/userRegApi');
const {ProductInsertController} =require("../controller/ProductInsertController")
const {userLoginApi} = require('../controller/userLoginApi')
const {productDisplayController} = require("../controller/productDisplayController")
const {adminLogin} = require('../controller/adminLogin')
const {ContactController} = require("../controller/ContactController")
const {ProductDeleteController}=require("../controller/ProductDeleteController")
const {ProductUpdateController}=require("../controller/ProductUpdateController")
const {bookingController} = require('../controller/bookingController')
const {upload}=require("../services/carUploadService")
const {userForgotPasswordEmail,userForgotPasswordOtp,updatePassword} = require('../controller/userForgotPasswordController')
router.post('/registrations',userRegApi);
router.post('/login',userLoginApi)
router.post('/ForgotPasswordEmail',userForgotPasswordEmail)
router.post('/ForgotPasswordOtp',userForgotPasswordOtp)
router.post('/updatePassword',updatePassword)
router.post('/adminLogin',adminLogin);
router.post('/contact',ContactController)
router.post('/caradd',upload.single("Image"),ProductInsertController)
router.post('/cardisplay',productDisplayController)
router.post('/cardelete',ProductDeleteController)
router.post('/carupdate',ProductUpdateController)
router.post('/bookingcars',bookingController)
module.exports = router;