const nodemailer = require("nodemailer");
const subscribModel = require("../models/subscribModel")
const dotenv = require("dotenv");
dotenv.config();
const subscribationController = async(req,res)=>{
    const {email}=req.body;
    const  data = new subscribModel({
        email:email
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
        subject: "Confirm Your Subscription to SpeedyWheels Rentals!",
        text:"Thank you for subscribing! We are delighted that you are interested in our car services. Your registration is now complete, and you are ready to explore our extensive range of cars.",
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
      res.json({data:data})
}
module.exports = {subscribationController}