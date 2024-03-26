const adminLoginModel = require("../models/adminLoginModel");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
dotenv.config();
const adminreg = async (req, res) => {
  const { adminname, email, password } = req.body;
  if (adminname && email && password) {
    console.log("adminname = ", adminname);
    try {
      const hashPassword = await bcrypt.hash(password, 10);
      const data = new adminLoginModel({
        adminname: adminname,
        email: email,
        password: hashPassword,
      });
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject:
          "Welcome to SpeedyWheels Rentals! Your Registration is Complete!",
        text: "Welcome to SpeedyWheels Rentals! We are thrilled to have you as a member of our community. Your registration is now complete, and you're all set to explore and enjoy our wide range of rental cars.",
      };
      console.log("mail option = ", mailOptions);
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("email sent = " + info.response);
        }
      });
      await data.save();
      res.json({ message: "admin Registration successfully...!!" });
    } catch (error) {
      console.log(error);
      return res.json({
        status: 500,
        message: "intrnal server error",
      });
    }
  }
};
// const adminLogin = async (req, res) => {
//   const { adminname, password } = req.body;
//   if (adminname && password) {
//     console.log("adminname = ",adminname);
//     try {
//       const admin = await adminLoginModel.findOne({ adminname, password });

//       if (admin) {
//         const ismatch = bcrypt.compareSync(password, admin.password);
//         if(ismatch)
//         const token = jwt.sign(
//           {
//             id: admin.id,
//             adminname: admin.adminname,
//           },
//           process.env.jwt_secret_key
//         );
//         return res.json({
//           status: 200,
//           message: "Login Successfully...!!",
//           token: token,
//         });
//       } else {
//         return res.json({
//           status: 400,
//           message: "invalide email and password",
//         });
//       }
//     } catch (error) {
//       stryps;
//       return res.json({ status: 500, message: "internal server error" });
//     }
//   } else {
//     return res.json({ status: 400, message: "all field are required" });
//   }
// };
const adminLogin = async (req, res) => {
  const {email,password} = req.body;
  try {
    if (email && password) {
      const admin = await adminLoginModel.findOne({ email: email });
      if (admin) {
        const ismatch = bcrypt.compareSync(password, admin.password);
        if (ismatch) {
          const token = jwt.sign(
            {
              id: admin.id,
              email: admin.email,
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
module.exports = { adminLogin, adminreg };
