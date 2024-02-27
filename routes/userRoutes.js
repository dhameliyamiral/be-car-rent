const express = require("express");
const router = express.Router();
// const {createOrder}=require("../controller/createOrder")
const { contactDisplay } = require("../controller/contactDisplay");
const { userAuthMiddlewares } = require("../middlewares/userAuthMiddlewares");
const { adminAuthMiddlewares } = require("../middlewares/adminAuthMiddlewares");
const { userRegApi, userLoginApi } = require("../controller/usersController");
const {
  carsInsertController,
  carsDeleteController,
  carsUpdateController,
  carsDisplayController,
} = require("../controller/carsController");
const { adminLogin } = require("../controller/adminLogin");
const { ContactController } = require("../controller/ContactController");
const {
  bookinginsertApi,
  bookingCancel,
  bookingUpdate,
} = require("../controller/bookingController");
const { bookingDisplay } = require("../controller/bookingDisplay");
const { upload } = require("../services/carUploadService");
const {
  userForgotPasswordEmail,
  userForgotPasswordOtp,
  updatePassword,
} = require("../controller/userForgotPasswordController");
router.get("/contactDisplay", contactDisplay);
router.post("/registrations", userRegApi);
router.post("/login", userLoginApi);
router.post("/ForgotPasswordEmail", userForgotPasswordEmail);
router.post("/ForgotPasswordOtp", userForgotPasswordOtp);
router.post("/updatePassword", updatePassword);
router.post("/adminLogin", adminLogin);
router.post("/contact", ContactController);
router.post(
  "/caradd",
  adminAuthMiddlewares,
  upload.single("Image"),
  carsInsertController
);
router.get("/cardisplay", carsDisplayController);
router.post("/cardelete", adminAuthMiddlewares, carsDeleteController);
router.post("/carupdate", adminAuthMiddlewares, carsUpdateController);
router.post("/bookingcars", userAuthMiddlewares, bookinginsertApi);
router.post("/bookingdisplay", adminAuthMiddlewares, bookingDisplay);
router.post("/bookingcancel", userAuthMiddlewares, bookingCancel);
router.post("/bookingUpdate", userAuthMiddlewares, bookingUpdate);
module.exports = router;
