const authService = require("../services/authService");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const userForgotPasswordEmail = async (req, res) => {
  const { email } = req.body;
  try {
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
        const otp = generateOTP();
        const otpExpiration = new Date(Date.now() + 60 * 1000);
        await userModel.findOneAndUpdate(
          { _id: user.id },
          { $set: { otp: otp, otpExpiration: otpExpiration } }
        );
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
  } catch (error) {
    return res.json({ status: 500, message: "internal server error" });
  }
};
const userForgotPasswordOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await userModel.findOne({ email, otp });
    console.log("user = ", user);
    if (!user) {
      return res.json({ message: "invalid otp ..!!" });
    }
    const now = new Date();
    if (now > user.otpExpiration) {
      await userModel.updateOne(
        { email },
        { otp: null, otpExpiration: null }
      );
      return res.json({ message: "otp expired" });
    }
    return res.json({ message: "otp verification successfully" });
  } catch (error) {
    return res.json({ status: 500,
      message: "intrnal server error",})
  }
};
const updatePassword = async (req, res) => {
  const { email, newpassword } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ message: "user not found" });
    }
    const hashedPassword = await bcrypt.hash(newpassword, 10);
    await userModel.updateOne(
      { email: user.email },
      { $set: { password: hashedPassword } }
    );
    await userModel.updateOne(
      { email },
      { otp: null, otpExpiration: null }
    );
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return res.json({ status: 500, message: "internal server error" });
  }
};
module.exports = {
  userForgotPasswordEmail,
  userForgotPasswordOtp,
  updatePassword,
};
