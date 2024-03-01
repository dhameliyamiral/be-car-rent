const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
let token;
const userAuthMiddlewares = async (req, res, next) => {
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
      } else {
        res.json({ status: 400, message: "you are not authorizeed" });
      }
    } else {
      res.json({ status: 400, message: "you are not authorizeed" });
    }
    next();
  }
};
module.exports = { userAuthMiddlewares };
