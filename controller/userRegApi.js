const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const registrationModel = require("../models/registrationModel");
const userService = require("../services/registrationService");
dotenv.config();
const userRegApi = async (req, res) => {
  const { fname,lname, email, mobile,password,gender } = req.body;
  if (fname&&lname&&email&& mobile&&password&&gender) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const data = new registrationModel({
        fname: fname,
        lname: lname,
        email: email,
        mobile: mobile,
        password: hashPassword,
        gender:gender,
        // city: city,
        // dob: dob,
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
        text: `registration succesfuly`,
      };
      console.log("mail option = ", mailOptions);
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("email sent = " + info.response);
        }
      });
      userService.create(data).then((data) => {
        return res.json({
          status: 200,
          message: "registraion succesfully...!!!",
          data: data,
        });
      });
    } catch (error) {
      console.log(error);
      return res.json({
        status: 500,
        message: "server error is ..",
      });
    }
  }
};
module.exports = { userRegApi };
