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
        subject: "Welcome to SpeedyWheels Rentals! Your Registration is Complete!",
        text:"Welcome to SpeedyWheels Rentals! We are thrilled to have you as a member of our community. Your registration is now complete, and you're all set to explore and enjoy our wide range of rental cars.",
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
const userLoginApi = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email && password) {
      const user = await authService.findOne({ email: email });
      if (user) {
        const ismatch = bcrypt.compareSync(password, user.password);
        if (ismatch) {
          const token = jwt.sign(
            {
              id: user.id,
              email: user.email,
            },
            process.env.jwt_secret_key
          );
          const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_POST,
            secure: false,
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          });
          const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: "Welcome Back to SpeedyWheels Rentals! You're Successfully Logged In!",
            text: `Welcome to SpeedyWheels Rentals! We are thrilled to have you as a member of our community. Your registration is now complete, and you're all set to explore and enjoy our wide range of rental cars.`,
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
            } else {
              console.log("email sent = " + info.response);
            }
          });
          return res.json({
            status: 200,
            message: "login successfully..!!",
            token,
          });
        } else {
          return res.json({
            status: 400,
            message: "Somthing went wrong, Please try later...!!",
          });
        }
      }
      else{
        return res.json({
          status: 400,
          message: "Somthing went wrong,please try later...!!",
        });
      }
    } else {
      res.json({
        status: 200,
        message: "all field are required..!!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: 500,
      message: "intrnal server error",
    });
  }
};
module.exports = { userRegApi ,userLoginApi};