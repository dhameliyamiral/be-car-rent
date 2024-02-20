const authService = require("../services/authService");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
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
            subject: "login informations",
            text: `Hello Your login details:\nUsername: ${email}\nPassword: ${password}`,
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
module.exports = { userLoginApi };
