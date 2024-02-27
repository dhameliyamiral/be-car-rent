const adminLoginModel = require("../models/adminLoginModel");
const jwt = require("jsonwebtoken");
const adminLogin = async (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    try {
      const admin = await adminLoginModel.findOne({ username, password });
      if (admin) {
        const token = jwt.sign(
          {
            id: admin.id,
            username: admin.username,
          },
          process.env.jwt_secret_key
        );
        return res.json({
          status: 200,
          message: "Login Successfully...!!",
          token: token,
        });
      } else {
        return res.json({
          status: 400,
          message: "invalide email and password",
        });
      }
    } catch (error) {
      return res.json({ status: 500, message: "internal server error"});
    }
  } else {
    return res.json({ status: 400, message: "all field are required"});
  }
};
module.exports = { adminLogin };
