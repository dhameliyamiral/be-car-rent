const userService = require("../services/registrationService");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const userLoginApi = async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const user = await userService.findOne({ email: email });
    console.log("user = ", user);
    const ismatch = await bcrypt.compare(password, user.password);
    if (user) {
      if (req.body.email === user.email && ismatch) {
        const token = await jwt.sign(
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
        console.log("mail option = ", mailOptions);
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log("email sent = " + info.response);
          }
        });
        return res.json({
          status: "success",
          message: "login success..!",
          token,
        });
      } else {
        return res.json({
          status: "failed",
          message: "password and email are not same..!!",
        });
      }
    }
  } else {
    res.json({
      status: 200,
      message: "all field are required..!!",
    });
  }
};
module.exports = { userLoginApi };
