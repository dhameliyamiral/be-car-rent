const adminLoginModel = require("../models/adminLoginModel");
const adminLogin= async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await adminLoginModel.findOne({ username ,password });
    if (admin) {
      return res.json({  status: 200,message: "login sucesfully..!!" });
    }
    else{
        return res.json({status: 400,message:"invalide email and password"})
    }
  } catch (error) {
    return res.json({status:500,message:"internal server error"}) 
  }
};
module.exports = {adminLogin };
