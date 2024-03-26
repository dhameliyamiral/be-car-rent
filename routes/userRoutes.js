const express = require("express");
const router = express.Router();
const path = require("path");

const tempPath = path.join(__dirname, "./../uploads");
console.log("temp = path === ", tempPath);
const { initiate, capture_payment } = require("../controller/payment");
// const {createOrder}=require("../controller/createOrder")
const { contactDisplay } = require("../controller/contactDisplay");
const {
  CommentsController,
  displaycommentController,
} = require("../controller/CommentsController");
const {
  subscribationController,
  admindisplaysubscribation,
} = require("../controller/subscribationController");
const { userAuthMiddlewares } = require("../middlewares/userAuthMiddlewares");
const { adminAuthMiddlewares } = require("../middlewares/adminAuthMiddlewares");
const {
  userRegApi,
  userLoginApi,
  admindisplayuser,
} = require("../controller/usersController");
const {
  carsInsertController,
  carsDeleteController,
  carsUpdateController,
  carsDisplayController,
  addcarscart,
  carsfilter,
  displayCart,
} = require("../controller/carsController");

const {adminreg,adminLogin} = require("../controller/adminLogin");
console.log("adminreg=",adminreg);

const { ContactController } = require("../controller/ContactController");
const {
  bookinginsertApi,
  bookingCancel,
  bookingUpdate,
  bookingdisplay,

  adminbookingdispaly,
} = require("../controller/bookingController");
// console.log("searchbooking =",searchbooking);
const {
  userForgotPasswordEmail,
  userForgotPasswordOtp,
  updatePassword,
} = require("../controller/userForgotPasswordController");
// router.get("/image/:imageName", (req, res) => {
//   try {
//     const imageName = req.params.imageName

//     res.sendFile(tempPath + '/' + imageName);

//   }  catch(error) {
//     res.send({error})
//   }
// })
const {
  createBlog,
  deleteBlog,
  UpdateBlogController,displayBlog
} = require("../controller/BlogController");
router.get("/displayBlog",displayBlog)
router.get("/adminbookingdispaly", adminAuthMiddlewares, adminbookingdispaly);
router.post("/subscribation", subscribationController);
router.get("/displayCart", userAuthMiddlewares, displayCart);
router.get("/displayComment", displaycommentController);
router.post("/addComments", CommentsController);
router.post("/adminreg",adminreg)
router.get("/bookingdisplay", userAuthMiddlewares, bookingdisplay);
router.post("/payment", userAuthMiddlewares, initiate);
router.post("/capture_payment", userAuthMiddlewares, capture_payment);
router.get("/contactDisplay", contactDisplay);
router.post("/registrations", userRegApi);
router.post("/login", userLoginApi);
router.post("/ForgotPasswordEmail", userForgotPasswordEmail);
router.post("/ForgotPasswordOtp", userForgotPasswordOtp);
router.post("/updatePassword", updatePassword);
router.post("/adminLogin", adminLogin);
router.post("/contact", ContactController);
router.post("/caradd", adminAuthMiddlewares, carsInsertController);
router.post("/carsfilter", carsfilter);
router.post("/createBlog", createBlog);
router.post("/addcarscart", userAuthMiddlewares, addcarscart);
router.get("/cardisplay", carsDisplayController);
router.post("/cardelete", adminAuthMiddlewares, carsDeleteController);
router.post("/carupdate", adminAuthMiddlewares, carsUpdateController);
router.post("/bookingcars", userAuthMiddlewares, bookinginsertApi);
router.post("/bookingcancel", userAuthMiddlewares, bookingCancel);
router.post("/bookingUpdate", userAuthMiddlewares, bookingUpdate);
router.get("/admindisplayuser", admindisplayuser);
router.post("/deleteBlog", deleteBlog);
router.get("/admindisplaysubscribation", admindisplaysubscribation);
router.post("/UpdateBlog", UpdateBlogController);
module.exports = router;
