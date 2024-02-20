const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const userModel = require("../models/userModel");
const authService = require("../services/authService");
dotenv.config();
const userRegApi = async (req, res) => {
  const { fname, lname, email, mobile, password, gender } = req.body;
  if (fname && lname && email && mobile && password && gender) {
    try {
      const hashPassword = await bcrypt.hash(password, 10);
      const data = new userModel({
        fname: fname,
        lname: lname,
        email: email,
        mobile: mobile,
        password: hashPassword,
        gender: gender,
      });
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "registration",
        text: `Registration succesfully`,
      };
      console.log("mail option = ", mailOptions);
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("email sent = " + info.response);
        }
      });
      authService.create(data).then((data) => {
        return res.json({
          status: 200,
          message: "Registraion succesfully ...!!!",
          data: data,
        });
      });
    } catch (error) {
      console.log(error);
      return res.json({
        status: 500,
        message: "intrnal server error",
      });
    }
  }
};
module.exports = { userRegApi };
