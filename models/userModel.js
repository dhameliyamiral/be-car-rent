const mongoose = require("mongoose");
const registrationSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  conformPassword:{
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  otp: { 
    type: String, 
    default: null
   },
  otpExpiration: {
    type: Date,
    default: null,
  },
});
const userModel = mongoose.model("registrations", registrationSchema);
module.exports = userModel;

// fname, lname, email, mobile, password, gender;
