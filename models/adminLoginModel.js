const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
  adminname:  String,
  email:String,
  password: String,
});
const adminLoginModel = mongoose.model("adminlogin", adminSchema);
module.exports = adminLoginModel