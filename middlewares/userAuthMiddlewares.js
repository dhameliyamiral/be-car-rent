const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
let token;
const userAuthMiddlewares = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    token = authorization.split(" ")[1];
    const userTokenData = jwt.verify(token, process.env.jwt_secret_key);
    console.log("user =", userTokenData);
    if (userTokenData.id) {
      const user = await userModel.findOne({ _id: userTokenData.id });
      if (user) {
        req.userData = {
          id: user._id,
          email: user.email,
      
        };
        return next();
      } else {
        res.json({ status: 400, message: "you are not authorizeed" });
      }
    } else {
      res.json({ status: 400, message: "you are not authorizeed" });
    }
  } else {
    return res.status(400).json({ status: 400, message: "Authorization header missing or invalid" });
  }
    // next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    return res.status(401).json({ status: 401, message: "Unauthorized" });
  }
};

module.exports = { userAuthMiddlewares };
