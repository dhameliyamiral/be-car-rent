const authService = require("../services/authService");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const forgotpasswordSchema = require("../models/forgotPasswordModel");
const registrationModel = require("../models/registrationModel");
const userForgotPasswordEmail = async (req, res) => {
  const { email } = req.body;
  if (email) {
    const user = await authService.findOne({ email: email });
    if (req.body.email === user.email) {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_POST,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
      const generateOTP = () =>
        Math.floor(1000 + Math.random() * 9000).toString();
      console.log("otp = ", generateOTP());
      const otp = generateOTP();
      const otpExpiration = new Date(Date.now() + 60 * 1000);
      //   This expression calculates the number of milliseconds in 1 minutes.
      const data = new forgotpasswordSchema({
        email: email,
        otp: otp,
        otpExpiration: otpExpiration,
      });
      await data.save();
      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: user.email,
        subject: "Password forg OTP",
        text: `Your OTP for password forgot is = ${otp}`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      res
        .status(200)
        .json({ message: "Password forgot OTP sent successfully" });
    }
  } else {
    res.json({ status: 400, message: "please enter the email !!" });
  }
};
const userForgotPasswordOtp = async (req, res) => {
  const { email, otp } = req.body;
  const user = await forgotpasswordSchema.findOne({ email, otp });
  if (!user) {
    return res.json({ message: "invalid otp ..!!" });
  }
  const now = new Date();
  if (now > user.otpExpiration) {
    return res.json({ message: "otp expired" });
  }
  res.json({ message: "otp verification successfully" });
};
const updatePassword = async (req, res) => {
  const { email, newpassword, confirmpassword } = req.body;
  const user = await forgotpasswordSchema.findOne({ email });
  console.log(user);
  if (!user) {
    return res.json({ message: "user not found" });
  }
  const aa = user.email
  console.log("aa ===",aa);
  const hashedPassword = await bcrypt.hash(newpassword, 10);
  const update = await registrationModel.updateOne({email:user.email},{$set:{password:hashedPassword}})
  console.log("update = ",update);
  user.otp = null;
  user.otpExpiration = null;
  res.status(200).json({ message: "Password updated successfully" });
};

module.exports = {
  userForgotPasswordEmail,
  userForgotPasswordOtp,
  updatePassword,
};
