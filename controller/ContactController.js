const { ContactModel } = require("../models/ContactModel");
const nodemailer = require("nodemailer");
const ContactController = async (req, res) => {
  const { name, email, message, mobile_number } = req.body;
  try {
    if (name && email && message && mobile_number) {
      const data = new ContactModel({
        name: name,
        email: email,
        mobile_number: mobile_number,
        message: message,
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
        from: email,
        to: process.env.EMAIL_FROM,
        subject: `Contact Inquiry:${name}`,
        text: `A new message has been received:\n\nSender's Email: ${email}\n\nMessage:\n${message}`,
      };
      console.log("mail options = ", mailOptions);
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("email sent = " + info.response);
        }
      });
      await data.save();
      return res.json({
        status: 200,
        message: "Thank you for your message. It has been sent...!!",
      });
    } else {
      return res.json({
        status: 200,
        message: "all filed are required",
      });
    }
  } catch (error) {
    return res.json({ status: 500, message: "intrnal server error" });
  }
};

module.exports = { ContactController };

// Types of vehicles available for rental
// Rental rates, including any discounts or promotions
// Availability of optional features such as GPS navigation, child seats, etc.
// Rental terms and conditions, including insurance coverage and mileage limits
// Any special requirements or procedures for booking a rental car
