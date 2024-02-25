const express = require('express');
const router = express.Router(); 

const {userAuthMiddlewares} = require("../middlewares/userAuthMiddlewares")
const {adminAuthMiddlewares} = require('../middlewares/adminAuthMiddlewares')
const {userRegApi} = require('../controller/userRegApi');
const {ProductInsertController} =require("../controller/ProductInsertController")
const {userLoginApi} = require('../controller/userLoginApi')
const {bookingCancel} =require('../controller/bookingCancel')
const {productDisplayController} = require("../controller/productDisplayController")
const {adminLogin} = require('../controller/adminLogin')
const {ContactController} = require("../controller/ContactController")
const {ProductDeleteController}=require("../controller/ProductDeleteController")
const {ProductUpdateController}=require("../controller/ProductUpdateController")
const {bookingController} = require('../controller/bookingController')
const {bookingDisplay}=require('../controller/bookingDisplay')
const {upload}=require("../services/carUploadService")
const {bookingUpdate} = require("../controller/bookingUpdate")
const {userForgotPasswordEmail,userForgotPasswordOtp,updatePassword} = require('../controller/userForgotPasswordController')

router.post('/registrations',userRegApi);
router.post('/login',userLoginApi)
router.post('/ForgotPasswordEmail',userForgotPasswordEmail)
router.post('/ForgotPasswordOtp',userForgotPasswordOtp)
router.post('/updatePassword',updatePassword)
router.post('/adminLogin',adminLogin);
router.post('/contact',ContactController)
router.post('/caradd',adminAuthMiddlewares,upload.single("Image"),ProductInsertController)
router.get('/cardisplay',productDisplayController)
router.post('/cardelete',adminAuthMiddlewares,ProductDeleteController)
router.post('/carupdate',adminAuthMiddlewares,ProductUpdateController)
router.post('/bookingcars',userAuthMiddlewares,bookingController)
router.post('/bookingdisplay',adminAuthMiddlewares,bookingDisplay)
router.post('/bookingcancel',userAuthMiddlewares,bookingCancel)
router.post('/bookingUpdate',userAuthMiddlewares,bookingUpdate)

module.exports = router;
