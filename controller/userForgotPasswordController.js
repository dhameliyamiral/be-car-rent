const authService = require("../services/authService");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const userForgotPasswordEmail = async (req, res) => {
  const { email } = req.body;
  try {
    if (email) {
      const user = await authService.findOne({ email: email });
      console.log("user = ", user);
      if (req.body.email === user.email) {
        const transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST,
          port: process.env.EMAIL_POST,
          secure: false,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
          tls: {
            rejectUnauthorized: false
          }
        });
        const generateOTP = () =>
          Math.floor(1000 + Math.random() * 9000).toString();
        const otp = generateOTP();
        console.log("otp = = =",otp);
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
          .json({ message: "Password Forgot OTP Sent Successfully" });
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
    const user = await userModel.findOne({ email: email, otp: otp });
    console.log("user = ", user);
    if (!user) {
      return res.json({ message: "invalid otp ..!!" });
    }
    const now = new Date();
    if (now > user.otpExpiration) {
      await userModel.updateOne({ email }, { otp: null, otpExpiration: null });
      return res.json({ message: "otp expired" });
    }
    return res.json({ message: "Otp Verification Successfully" });
  } catch (error) {
    return res.json({ status: 500, message: "intrnal server error" });
  }
};
const updatePassword = async (req, res) => {
  const { email, newpassword,conformPassword} = req.body;
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
    const hashConformPass = await bcrypt.hash(conformPassword,10);
    await userModel.updateOne(
      {email:user.email},
      {$set:{conformPassword:hashConformPass}}
    )
    await userModel.updateOne({ email }, { otp: null, otpExpiration: null });
    res.status(200).json({ message: "Password Updated Successfully" });
  } catch (error) {
    return res.json({ status: 500, message: "internal server error" });
  }
};
module.exports = {
  userForgotPasswordEmail,
  userForgotPasswordOtp,
  updatePassword,
};
