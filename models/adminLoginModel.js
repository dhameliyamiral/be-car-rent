const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
  username:  String,
  password: String,
});
const adminLoginModel = mongoose.model("adminlogin", adminSchema);
module.exports = adminLoginModel