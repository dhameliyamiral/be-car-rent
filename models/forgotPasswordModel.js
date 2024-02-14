const mongoose = require('mongoose')
const forgotPasswordModel = new mongoose.Schema({
    email : String,
    otp:String,
    otpExpiration:Date
})
const forgotpasswordSchema = mongoose.model("forgotPasswordOtp",forgotPasswordModel);
module.exports = forgotpasswordSchema;